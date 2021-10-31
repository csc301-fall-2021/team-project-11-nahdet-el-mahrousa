import React, { useState } from 'react';
import "./Message.scss";

class Message extends React.Component {

    render() {
        const { message, replies, makeReply } = this.props
        return (
            <div className="message-container">
                <div class="avatar"></div>
                <div className="message-bubble">
                    <div className="message-content">
                        {message.content}
                    </div>

                    <div className="replies-container">
                        {
                            replies.map((reply) => {
                                return (
                                    <div className="reply-option">
                                        <button
                                            className="reply-option-btn"
                                            onClick={() => makeReply(reply)}
                                        >
                                            {reply.content}
                                        </button>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Message;