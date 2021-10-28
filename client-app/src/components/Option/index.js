import React from 'react';
import Button from '@mui/material/Button';

class Option extends React.Component {

    render() {
        return (
            <div className="option">
                <Button variant="contained" color="green" style={{textTransform: 'none'}}>
                    Option
                </Button>
            </div>
        )
    }
}

export default Option;