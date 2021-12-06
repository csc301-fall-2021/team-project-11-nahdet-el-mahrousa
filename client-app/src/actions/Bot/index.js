import { getFirstMessage, getNextMessage } from 'api/client-api';

// Methods in this file modifies the Message component state

export function loadChatHistory(msgQueue) {
    if (localStorage.getItem("chatHistory")) {
        const dateThreshold = (new Date()).getDate() - 7;
        // only restore the page with data stored in the last 7 days
        if (localStorage.getItem("chatTime") >= dateThreshold) {
            const restoredData = localStorage.getItem("chatHistory");
            msgQueue.setState({
                chat: JSON.parse(restoredData)
            }, () => msgQueue.scrollToMyRef());
        }
    }
}

export function clearChatHistory(msgQueue) {
    localStorage.removeItem("chatHistory")
    localStorage.removeItem("chatTime")
    msgQueue.setState({
        chat: []
    }, () => msgQueue.scrollToMyRef());
}

export async function initChat(msgQueue) {
    const newQueue = [...msgQueue.state.chat];

    // get first msg from API
    try {
        const entity = await getFirstMessage();
        // console.log(entity);
        newQueue.push(entity);
        msgQueue.setState({
            chat: newQueue
        }, () => msgQueue.scrollToMyRef());
    } catch (error) {
        const err = `${String(error)}. Please contact the staff.`
        console.error(err);
        newQueue.push({
            message: {
                content: err
            },
            replies: []
        })
        msgQueue.setState({
            chat: newQueue
        }, () => msgQueue.scrollToMyRef());
    }
}

// Function to add a reply, needs to be exported
export async function makeReply(msgQueue, reply) {
    // log(msgQueue.state.chat, reply);

    const newQueue = [...msgQueue.state.chat];
    const replyInChat = { reply };
    newQueue.push(replyInChat);

    msgQueue.setState({
        chat: newQueue
    });

    // Send a request to server
    // With the response, add a new Message to msgQueue
    try {
        // send statistics to google
        msgQueue.props.ReactGA.event({
            category: 'Reply',
            action: 'click',
            label: String(reply._id)
        })
        const entity = await getNextMessage(reply);
        // console.log(entity);
        newQueue.push(entity);
        msgQueue.setState({
            chat: newQueue
        }, () => msgQueue.scrollToMyRef());
        
        // record the response in local storage
        localStorage.setItem("chatHistory", JSON.stringify(msgQueue.state.chat));
        // set today the respond date in local storage
        localStorage.setItem("chatTime", (new Date()).getDate());
    } catch (error) {
        const err = `${String(error)}. Please contact the staff.`
        console.error(err);
        newQueue.push({
            message: {
                content: err
            },
            replies: []
        })
        msgQueue.setState({
            chat: newQueue
        }, () => msgQueue.scrollToMyRef());
    }
}

export function exportConversation() {

    // Reference: https://stackoverflow.com/questions/22347756/how-to-export-a-string-to-a-file-in-html-phonegap
    function download(filename, content) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        pom.setAttribute('download', filename);
        pom.click();
    }

    let output = `Date: ${new Date().toUTCString()}`

    // Output each item in the localHistory to a string
    const chatHistory = localStorage.getItem("chatHistory")
    if (chatHistory) {
        const conversation = JSON.parse(chatHistory)
        conversation.forEach((item, i) => {
            if ("message" in item) {
                output += `\nNM Bot: \n${item.message.content}`
            } else if ("reply" in item) {
                output += `\nYou: \n${item.reply.content}`
            }
            output += "\n---------------------"
        })
    }

    download("NM Bot Conversation.txt", output)
}