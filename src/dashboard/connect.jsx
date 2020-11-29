import React from "react";
import ReactDOM from 'react-dom';
import {TextField, Grid, Button} from "@material-ui/core";
import {DarkTheme} from "./components/dark-theme";
import {useReplicant} from 'use-nodecg';

ReactDOM.render(<ConnectApp/>, document.querySelector('#app'));


function ConnectApp() {
    const [obsConnectDetails, setObsConnectDetails] = useReplicant('connect-details', {
        ip: 'localhost',
        port: 4444,
        password: '',
        connected: false,
    });


    const handleChange = (e) => {
        setObsConnectDetails({...obsConnectDetails, [e.target.name]: e.target.value});
    };

    const handleConnect = () => nodecg.sendMessage('connect');
    const handleDisconnect = () => nodecg.sendMessage('disconnect');

    return (
        <DarkTheme>
            <Grid container spacing={3}>
                {!obsConnectDetails.connected && (
                    <Grid item xs={12}>
                        <TextField fullWidth margin="normal" name="ip" value={obsConnectDetails.ip}
                                   onChange={handleChange} label="Host" variant="outlined"/>
                        <TextField fullWidth margin="normal" name="port" value={obsConnectDetails.port}
                                   onChange={handleChange} label="Port" variant="outlined"/>
                        <TextField fullWidth margin="normal" name="password" value={obsConnectDetails.password}
                                   onChange={handleChange} label="Password" variant="outlined"/>
                        <Button variant="contained" color="primary" onClick={handleConnect}>Connect</Button>
                    </Grid>
                )}
                {obsConnectDetails.connected && (
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleDisconnect}>Disconnect</Button>
                    </Grid>
                )}
            </Grid>
        </DarkTheme>
    )
}