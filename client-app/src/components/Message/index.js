import React from 'react';
import Box from '@mui/material/Box';
import Option from "components/Option";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            border: 0
        }}
    />
);

class Message extends React.Component {

    render() {
        return (
            <div className="message">
                <Box
                    sx={{
                        width: 300,
                        height: 300,
                        borderRadius: 5,
                        backgroundColor: '#FFFFFF',
                        boxShadow: 2,
                        m: 1, // margin: theme.spacing(1)
                        p: {
                        xs: 3, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) }
                        },
                        zIndex: 'tooltip', // theme.zIndex.tooltip
                        color: '#4D4D4D'
                    }}
                >
                    This is a message.
                    <ColoredLine color = "#E7E7E7" />
                    <Option />
                </Box>
            </div>
        )
    }
}

export default Message;