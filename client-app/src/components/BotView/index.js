import React from 'react';
import Message from 'components/Message';
import Reply from 'components/Reply';

import { resumeChat, initChat, makeReply } from "actions/Bot";

import "./BotView.scss"
import StartButton from 'components/StartButton';

class BotView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chat: []
        }
    }

    componentWillMount = () => {
        resumeChat(this);
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
                                const content = chatItem.message.content;
                                let messages = content.split("\n"); // an array of message content
                                messages.filter(m=>m!=="");
                                const listItems = [];
                                for (let i = 0; i < messages.length - 1; i++) {
                                    listItems.push(<Message
                                        message={messages[i]}
                                    />)
                                }
                                listItems.push(<Message
                                    message={messages[messages.length - 1]}
                                    replies={chatItem.replies}
                                    makeReply={(reply) => makeReply(this, reply)}
                                />)

                                return (
                                    {listItems}
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
