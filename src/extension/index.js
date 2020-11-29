import {OBSUtility} from 'nodecg-utility-obs';

function Setup(nodecg) {
    nodecg.log.info('Creating new OBS Utility');
    const obsUtility = new OBSUtility(nodecg);

    const obsConnectDetails = nodecg.Replicant('connect-details', {
        defaultValue: {
            ip: 'localhost',
            port: 4444,
            password: '',
            connected: false,
        }
    });
    const activeSceneSources = nodecg.Replicant('active-scene-sources', {defaultValue: []});
    const availableAudioTypes = nodecg.Replicant('available-audio-types', {defaultValue: {}});

    function updateCurrentScene() {
        obsUtility.send('GetCurrentScene').then(res => {
            activeSceneSources.value = res.sources;
            return res;
        });
    }

    function updateSourceTypes() {
        obsUtility.send('GetSourceTypesList').then(res => {
            let audio = {};
            res.types.map(type => audio[type.typeId] = type.caps.hasAudio);
            availableAudioTypes.value = audio;
        });
    }

    // Custom OBS Listeners
    nodecg.Replicant('obs:websocket').on('change', val => {
        if (val.status === 'connected') {
            updateCurrentScene();
            updateSourceTypes();
        }
        return obsConnectDetails.value.connected = val.status === 'connected';
    });

    obsUtility.on('SwitchScenes', () => {
        updateCurrentScene();
    });

    // NodeCG Listeners
    nodecg.listenFor('connect', (val, cb) => {
        const {ip, port, password} = obsConnectDetails.value;
        nodecg.sendMessage('obs:connect', {ip, port, password});
    });
    nodecg.listenFor('disconnect', () => nodecg.sendMessage('obs:disconnect'));

    nodecg.listenFor('change-scene', (name) => nodecg.sendMessage('obs:transition', {sceneName: name}));

    nodecg.listenFor('render-source', (opts) => {
        const {source, render} = opts;
        obsUtility.send('SetSceneItemRender', {source, render}).then(updateCurrentScene);
    });

    nodecg.listenFor('toggle-mute-source', (opts) => {
        const {source} = opts;
        obsUtility.send('ToggleMute', {source}).then(updateCurrentScene);
    });
    nodecg.listenFor('set-volume-source', (opts) => {
        const {source, volume} = opts;
        obsUtility.send('SetVolume', {source, volume}).then(updateCurrentScene);
    })
}

// noinspection JSUnusedGlobalSymbols
export default Setup;