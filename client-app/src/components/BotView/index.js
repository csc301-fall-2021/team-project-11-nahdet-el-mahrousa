import React from 'react';
import Message from 'components/Message';
import Reply from 'components/Reply';

import { loadMyData, initChat, makeReply, clearData } from "actions/Bot";
import { unmountComponentAtNode } from "react-dom";

import "./BotView.scss"
import StartButton from 'components/StartButton';
// import RefreshButton from 'components/RefreshButton';

class BotView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chat: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        loadMyData(this);
    }

    componentWillUnmount() {
        clearData(this);
        // document.removeEventListener("click", this.handleClick);
    }

    handleClick() {
        
    }

    chatContainer = React.createRef();

    scrollToMyRef = () => {
        const scroll = this.chatContainer.current.scrollHeight -
        this.chatContainer.current.clientHeight;
        this.chatContainer.current.scrollTo(0, scroll);
    }

    render() {
        return (
            <div id="new-page" ref={this.chatContainer} className="bot-view">
                <div className="bot-chat-container">
                    <button onClick={() => clearData(this)}>Refresh</button>
                    <StartButton initChat={() => initChat(this)} />
                    {
                        this.state.chat.map((chatItem) => {
                            if ("message" in chatItem) {
                                const content = chatItem.message.content;
                                let messages = content.split("\n"); // an array of message content
                                //messages.filter(m=>m!=="");
                                if (messages.length === 1) {
                                    return (<Message
                                        message={chatItem.message}
                                        replies={chatItem.replies}
                                        makeReply={(reply) => makeReply(this, reply)}
                                    />)
                                }
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
                                    <ul>{listItems}</ul>
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
