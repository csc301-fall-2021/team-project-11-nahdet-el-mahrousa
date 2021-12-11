import { getFirstMessage, getNextMessage } from 'api/client-api';

// Methods in this file modifies the Message component state

// Load the chat history that is stored in local when the page is refreshed
// or re-start the program. Only the data that is stored in the last 7 days will be loaded.
export function loadChatHistory(msgQueue) {
    // If there is a chat history in local storage
    if (localStorage.getItem("chatHistory")) {
        // Date a week ago from the current date
        const dateThreshold = (new Date()).getDate() - 7;
        // Only restore the page with data stored in the last 7 days
        if (localStorage.getItem("chatTime") >= dateThreshold) {
            const restoredData = localStorage.getItem("chatHistory");
            msgQueue.setState({
                chat: JSON.parse(restoredData)
            }, () => msgQueue.scrollToMyRef());
        }
    }
}

// Clear the chat history that is stored in local
export function clearChatHistory(msgQueue) {
    localStorage.removeItem("chatHistory")
    localStorage.removeItem("chatTime")
    msgQueue.setState({
        chat: []
    }, () => msgQueue.scrollToMyRef());
}

// Initialize the first chat message when the chat starts
export async function initChat(msgQueue) {
    const newQueue = [...msgQueue.state.chat];

    // get first msg from API
    try {
        const entity = await getFirstMessage();
        newQueue.push(entity);
        msgQueue.setState({
            chat: newQueue
        }, () => msgQueue.scrollToMyRef());
    } catch (error) {
        console.error(error);
    }
}

// Function to add a reply, needs to be exported
export async function makeReply(msgQueue, reply) { 
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
        // make the next bot message depends on the response
        const entity = await getNextMessage(reply);
        newQueue.push(entity);
        msgQueue.setState({
            chat: newQueue
        }, () => msgQueue.scrollToMyRef());
        
        // record the response in local storage
        localStorage.setItem("chatHistory", JSON.stringify(msgQueue.state.chat));
        // set today the respond date in local storage
        localStorage.setItem("chatTime", (new Date()).getDate());
    } catch (error) {
        console.log(error);
    }
}

// Export the conversation as a text file
export function exportConversation() {

    // Reference: https://stackoverflow.com/questions/22347756/how-to-export-a-string-to-a-file-in-html-phonegap
    function download(filename, content) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        pom.setAttribute('download', filename);
        pom.click();
    }

    // Add the chat date stored in the local storage
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

    // Download file "NM Bot Conversation.txt" with text <output>
    download("NM Bot Conversation.txt", output)
}