import React from 'react';
import "./Message.scss";

// Bot message that contains the avatar, message, and options
class Message extends React.Component {

    render() {
        const { message, replies, makeReply } = this.props
        return (
            <div className="message-container">
                <div className="avatar"></div>
                <div className="message-bubble">
                    <div className="message-content">
                        {message.content}
                    </div>

                    {replies.length > 0?
                        <div className="replies-container">
                            {
                                replies.map((reply) => {
                                    return ( // Make the reply if the specific option is pressed
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
                        :null
                    }
                </div>
            </div>
        )
    }
}

export default Message;