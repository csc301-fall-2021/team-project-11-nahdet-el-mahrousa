import React from 'react';
import "./StartButton.scss";


class StartButton extends React.Component {

    render() {
        const { initChat } = this.props
        return (
            <div className="starter-view">
                <button className="start-btn" onClick={initChat}> Start A Chat with NM Bot </button>
            </div>

        )
    }
}

export default StartButton;