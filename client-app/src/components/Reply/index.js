import React from 'react';
import Box from '@mui/material/Box';

class Reply extends React.Component {

    render() {
        return (
            <div className="reply">
                <Box
                    sx={{
                        width: 300,
                        height: 300,
                        borderRadius: 5,
                        backgroundColor: '#439D7D',
                        boxShadow: 2,
                        m: 1, // margin: theme.spacing(1)
                        p: {
                        xs: 3, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) }
                        },
                        zIndex: 'tooltip', // theme.zIndex.tooltip
                        color: '#fff'
                    }}
                >
                    This is a reply.
                </Box>
            </div>
        )
    }
}

export default Reply;