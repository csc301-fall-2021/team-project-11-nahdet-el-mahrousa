import React from 'react';
import Message from 'components/Message';
import Reply from 'components/Reply';

import { loadChatHistory, initChat, makeReply, clearChatHistory } from "actions/Bot";

import "./BotView.scss"
import StartButton from 'components/StartButton';
import RefreshButton from 'components/RefreshButton';

/**
 * Display a message to multiple paragraphs.
 */
class MessageList extends React.Component {
    render() {
        const { message, replies, view } = this.props
        const paragraphs = message.content.split("\n").filter(p => p !== "")
        console.log(message)
        if (paragraphs.length === 1) {
            return (<Message
                message={message}
                replies={replies}
                makeReply={(reply) => makeReply(view, reply)}
            />)
        } else {
            return (
                paragraphs.map((content, i) => {
                    console.log({ content })
                    if (i !== paragraphs.length - 1) {
                        return (<Message
                            message={{ content }}
                            replies={[]}
                            makeReply={(reply) => makeReply(view, reply)}
                        />)
                    } else {
                        return (<Message
                            message={{ content }}
                            replies={replies}
                            makeReply={(reply) => makeReply(view, reply)}
                        />)
                    }
                })
            )
        }
    }
}

class BotView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chat: []
        }
    }

    componentDidMount() {
        loadChatHistory(this);
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
                    <RefreshButton clearChatHistory={() => clearChatHistory(this)} />
                    <StartButton initChat={() => initChat(this)} />
                    {
                        // Chat items are retrieved from server
                        // It can either be { message, replies } for a message,
                        // or { reply } for a reply. 
                        this.state.chat.map((chatItem) => {
                            console.log(chatItem)
                            if ("message" in chatItem) {
                                return <MessageList
                                    message={chatItem.message}
                                    replies={chatItem.replies}
                                    view={this}
                                />
                            } else if ("reply" in chatItem) {
                                return <Reply reply={chatItem.reply} />
                            }
                            return null
                        })
                    }
                </div>
            </div>
        );
    }
}

export default BotView;
