import React from 'react';
import "./RefreshButton.scss";

// Refresh button that clears the chat history in local
class RefreshButton extends React.Component {

    render() {
        const { clearChatHistory } = this.props
        return (
            <div className="refresh-container">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <button className="refresh-btn" onClick={clearChatHistory}><i class="fa fa-refresh"></i></button>
            </div>
            
            
        )
    }
}

export default RefreshButton;