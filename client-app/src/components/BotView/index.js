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
        // Split the message
        const paragraphs = message.content.split("\n").filter(p => p !== "")
        // If the message is one-line, display the message directly
        if (paragraphs.length === 1) {
            return (<Message
                message={message}
                replies={replies}
                makeReply={(reply) => makeReply(view, reply)}
            />)
        } else { // Multiple line message
            return (
                // Display each line as a individual message by mapping
                paragraphs.map((content, i) => {
                    // The current message is not the last line
                    if (i !== paragraphs.length - 1) {
                        return (<Message
                            message={{ content }}
                            replies={[]}
                            makeReply={(reply) => makeReply(view, reply)}
                        />)
                    } else { // Last line of the message, display message with options
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
    // Set the state and initialize chat in it
    constructor(props) {
        super(props)
        this.state = {
            chat: []
        }
    }

    // Load the chat history when the component mounts
    componentDidMount() {
        loadChatHistory(this);
    }

    chatContainer = React.createRef();

    // Scroll to the position of the last message
    scrollToMyRef = () => {
        const scroll = this.chatContainer.current.scrollHeight -
            this.chatContainer.current.clientHeight;
        this.chatContainer.current.scrollTo(0, scroll);
    }

    render() {
        return (
            <div ref={this.chatContainer} className="bot-view">
                <div className="bot-chat-container">
                    { // Clear the chat history when the refresh button is clicked
                        <RefreshButton clearChatHistory={() => clearChatHistory(this)} /> 
                    }
                    {/* Initialize the first message when the start button is clicked */}
                    <StartButton initChat={() => initChat(this)} />
                    {
                        // Chat items are retrieved from server
                        // It can either be { message, replies } for a message,
                        // or { reply } for a reply. 
                        this.state.chat.map((chatItem) => {
                            console.log(chatItem)
                            // Return MessageList if message in chat
                            if ("message" in chatItem) {
                                return <MessageList
                                    message={chatItem.message}
                                    replies={chatItem.replies}
                                    view={this}
                                />
                            } else if ("reply" in chatItem) { // Return Reply if reply in chat
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
