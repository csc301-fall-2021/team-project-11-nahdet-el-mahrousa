import React from 'react';

import Message from "components/Message";
import Reply from "components/Reply";
import Result from "components/Result";
import "./index.scss";

import Box from '@mui/material/Box';
import {createTheme, ThemeProvider } from '@mui/material/styles';

document.body.style.backgroundColor = "#E5E5E5";

// const mockData = {
//     message: {
//         content: "message 1", 
//         label: "hhh",
//         fromMessage: "msg 1",
//         toMessage: "msg 2"
//     },
//     options: {
//         content: "option 1",
//     },
//     {
//         content: "option 2",
//     }
// }

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
            <div class="row">
                <div class="column side">
                    <h1> Dashboard </h1>
                </div>
                <div class="column middle">
                    <Message /> 
                </div>
                <div class="column side">
                    <Reply />
                </div>
                <div class="bottom">
                </div>
            </div>
                
                
                // <div className="main-view home-main"> 
                //     {/* <ThemeProvider theme={mdTheme}>
                //         <Box sx={{ display: 'flex' }}>
                //             <Box
                //                 component="main"
                //                 sx={{
                //                     flexGrow: 1,
                //                     height: '100vh',
                //                     overflow: 'auto',
                //                 }}
                //             >
                //                 <Bot />
                //                 <Message />
                //                 <Reply />
                //             </Box>
                //         </Box>
                //     </ThemeProvider> */}
                // </div>
        )
    }
}

export default HomePage;