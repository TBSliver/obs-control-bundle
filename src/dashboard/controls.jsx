import ReactDOM from "react-dom";
import React from "react";
import {DarkTheme} from "./components/dark-theme";
import {useReplicant} from "use-nodecg";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import IconButton from "@material-ui/core/IconButton";
import {Slider} from "@material-ui/core";

ReactDOM.render(<ControlsApp/>, document.querySelector('#app'));

function ControlsApp() {
    const [sceneList] = useReplicant('obs:sceneList', []);
    const [activeScene] = useReplicant('obs:programScene', '');
    const [activeSources] = useReplicant('active-scene-sources', []);
    const [audioTypes] = useReplicant('available-audio-types', {});

    const handleOnClick = scene => () => {
        nodecg.sendMessage('change-scene', scene);
    };
    const handleOnClickSource = source => () => {
        nodecg.sendMessage('render-source', {source: source.name, render: !source.render});
    };
    const handleToggleMute = source => () => {
        nodecg.sendMessage('toggle-mute-source', {source: source.name});
    };
    const handleVolumeChange = source => (e, newValue) => {
        nodecg.sendMessage('set-volume-source', {source: source.name, volume: newValue / 100});
    }

    return (
        <DarkTheme>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>Scenes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container>
                                <Grid item xs={12}>
                                    <List>
                                        {sceneList.map((scene, index) => (
                                            <ListItem key={index} button disabled={scene === activeScene.name}
                                                      onClick={handleOnClick(scene)}>
                                                <ListItemText primary={scene}/>
                                                <ListItemSecondaryAction>
                                                    {scene === activeScene.name ? (<VisibilityIcon/>) : (
                                                        <VisibilityOffOutlinedIcon/>)}
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>Sources</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container>
                                <Grid item xs={12}>
                                    <List>
                                        {activeSources.map((source, index) => (
                                            <ListItem key={index} button onClick={handleOnClickSource(source)}>
                                                <ListItemText primary={source.name}/>
                                                <ListItemSecondaryAction>
                                                    {source.render ? (<VisibilityIcon/>) : (
                                                        <VisibilityOffOutlinedIcon/>)}
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>Volumes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container>
                                <Grid item xs={12}>
                                    <List>
                                        {activeSources.filter(s => audioTypes[s.type]).map((source, index) => (
                                            <>
                                                <ListItem key={index}>
                                                    <ListItemText primary={source.name}/>
                                                    <ListItemSecondaryAction>
                                                        <IconButton onClick={handleToggleMute(source)}>
                                                            {source.muted ? (<VolumeOffIcon/>) : (<VolumeUpIcon/>)}
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                <ListItem>
                                                    <Slider min={0} max={100} steps={1} value={source.volume * 100} onChange={handleVolumeChange(source)}/>
                                                </ListItem>
                                            </>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </DarkTheme>
    )
}