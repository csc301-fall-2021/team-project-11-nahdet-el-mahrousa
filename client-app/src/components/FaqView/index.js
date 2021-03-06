import React from 'react';
import "./FaqView.scss";

import {exportConversation} from "actions/Bot"

// The FAQ view container that contains the downloading button
class FaqView extends React.Component {
    render() {
        return (
            <div className="faq-view">
                <button className="export-file-btn" onClick={exportConversation}> Export Conversation </button>
            </div>
        )
    }
}

export default FaqView;
