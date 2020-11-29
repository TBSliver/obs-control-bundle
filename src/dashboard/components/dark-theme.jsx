import {CssBaseline, makeStyles} from "@material-ui/core";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import React from "react";
import Container from "@material-ui/core/Container";

export function DarkTheme(props) {
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    const useStyles = makeStyles(theme => ({
        container: {
            paddingBottom: theme.spacing(2),
            paddingTop: theme.spacing(2),
        }
    }));
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container className={classes.container}>
                {props.children}
            </Container>
        </ThemeProvider>
    )
}