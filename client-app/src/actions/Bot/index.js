import { getFirstMessage, getNextMessage } from 'api/client-api';

// Methods in this file modifies the Message component state

const log = console.log;

export async function initChat(msgQueue) {
    log(msgQueue);
    const newQueue = [...msgQueue.state.chat];

    // get first msg from API
    try {
        const entity = await getFirstMessage();
        console.log(entity);
        newQueue.push(entity);
        msgQueue.setState({
            chat: newQueue
        });
    }
    catch(error) {
        console.log(error);
    }
}

// Function to add a reply, needs to be exported
export async function makeReply(msgQueue, reply) {
    log(msgQueue.state.chat, reply);

    const newQueue = [...msgQueue.state.chat];
    const replyInChat = { reply };
    newQueue.push(replyInChat);

    msgQueue.setState({
        chat: newQueue
    });

    // Send a request to server
    // With the response, add a new Message to msgQueue
    try {
        const entity = await getNextMessage(reply);
        console.log(entity);
        newQueue.push(entity);
        msgQueue.setState({
            chat: newQueue
        });
    }
    catch(error) {
        console.log(error);
    }
}