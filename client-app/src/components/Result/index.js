import React from 'react';
import Box from '@mui/material/Box';

class Result extends React.Component {

    render() {
        return (
            <div className="result">
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
                    This is a result.
                </Box>
            </div>
        )
    }
}

export default Result;