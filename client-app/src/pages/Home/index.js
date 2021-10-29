import React from 'react';

import Bot from "components/Bot";
import Message from "components/Message";
import Reply from "components/Reply";
// import Option from "components/Option";
import Result from "components/Result";
import "./index.scss";

import Box from '@mui/material/Box';
import {createTheme, ThemeProvider } from '@mui/material/styles';

const mdTheme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
        green: {
            main: '#439D7D',
            contrastText: '#fff',
        }
    },
});

class HomePage extends React.Component {
    render() {
        return (
            <div className="page home-page">
                <div className="main-view home-main">    
                    <ThemeProvider theme={mdTheme}>
                        <Box sx={{ display: 'flex' }}>
                            <Box
                                component="main"
                                sx={{
                                    flexGrow: 1,
                                    height: '100vh',
                                    overflow: 'auto',
                                }}
                            >
                                <Bot />
                                <Message />
                                <Reply />
                                <Result />
                            </Box>
                        </Box>
                    </ThemeProvider>
                </div>
            </div>
        )
    }
}

export default HomePage;