import React from 'react';

import "./Reply.scss";

// Message reply by the user's choice
class Reply extends React.Component {

    render() {
        const { reply } = this.props;
        return (
            <div className="reply-container">
                <div className="reply-bubble">
                    <div className="reply-content">
                        {reply.content}
                    </div>
                </div>
            </div>
        )
    }
}

export default Reply;