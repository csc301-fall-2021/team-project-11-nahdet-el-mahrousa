import React from 'react';
import Message from 'components/Message';
import Reply from 'components/Reply';

import { initChat, makeReply } from "actions/Bot";

import "./BotView.scss"
import StartButton from 'components/StartButton';

const mockChat = [
    {
        message: { content: "Hello, welcome!" },
        replies: [{ content: "let's go!", toMessage: "tm3" }, { content: "I'll leave", toMessage: "tm2" }]
    },
    {
        reply: {
            content: "let's go",
            toMessage: "tm3"
        }
    },
    {
        message: { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
        replies: [{ content: "ok!", toMessage: "tm4" }, { content: "alright", toMessage: "tm5" }]
    }
]

class BotView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chat: []
        }
    }
    // makeReply(reply) {
    //     console.log(reply.toMessage)
    // }

    render() {
        return (
            <div className="bot-view">
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
