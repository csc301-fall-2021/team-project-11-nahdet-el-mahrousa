import React from 'react';
import "./StartButton.scss";

// Start button to initialize the first message of the chat
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