import React from 'react';
import Message from 'components/Message';
import Reply from 'components/Reply';

import { initChat, makeReply } from "actions/Bot";

import "./BotView.scss"
import StartButton from 'components/StartButton';

class BotView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chat: []
        }
    }

    chatContainer = React.createRef();

    scrollToMyRef = () => {
        const scroll = this.chatContainer.current.scrollHeight -
        this.chatContainer.current.clientHeight;
        this.chatContainer.current.scrollTo(0, scroll);
    }

    render() {
        return (
            <div ref={this.chatContainer} className="bot-view">
                <div className="bot-chat-container">
                    <StartButton initChat={() => initChat(this)} />
                    {
                        this.state.chat.map((chatItem) => {
                            if ("message" in chatItem) {
                                return (
                                    <Message
                                        message={chatItem.message}
                                        replies={chatItem.replies}
                                        makeReply={(reply) => makeReply(this, reply)}
                                    />
                                )
                            } else if ("reply" in chatItem) {
                                return <Reply reply={chatItem.reply} />
                            }
                            return ""
                        })
                    }
                </div>
            </div>
        );
    }
}

export default BotView;
