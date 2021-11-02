// Methods in this file modifies the Message component state

const log = console.log;

export const initChat = (msgQueue) => {
    log(msgQueue);
    const newQueue = [...msgQueue.state.chat]

    // TODO: get first msg from API
    const response = {
        msg: "OK", statusCode: 200,
        entity: {
            message: { content: "Hello, welcome!" },
            replies: [{ content: "let's go!", toMessage: "tm3" }, { content: "I'll leave", toMessage: "tm2" }]
        }
    }
    
    const firstMessage = response.entity;
    newQueue.push(firstMessage);

    msgQueue.setState({
        chat: newQueue
    });
}

// Function to add a reply, needs to be exported
export const makeReply = (msgQueue, reply) => {
    log(msgQueue.state.chat, reply);

    const newQueue = [...msgQueue.state.chat]
    const replyInChat = { reply }
    newQueue.push(replyInChat);

    msgQueue.setState({
        chat: newQueue
    });

    // TODO: Send a request to server
    const response = {
        msg: "OK", statusCode: 200,
        entity: {
            message: {
                content: "Test Message"
            },
            replies: [
                {
                    toMessage: "12312",
                    content: "Next"
                }
            ]
        }
    }

    // With the response, add a new Message to msgQueue
    const newMessage = response.entity
    newQueue.push(newMessage)
    msgQueue.setState({
        chat: newQueue
    });
};