const mockMessages = [
    {
        _id: 0,
        label: "Message #0",
        content: "This is Message #0"
    }, {
        _id: 1,
        label: "Message #1",
        content: "This is Message #1"
    }, {
        _id: 2,
        label: "Message #2",
        content: "This is Message #2"
    }
]

const mockReplies = [
    {
        _id: 0,
        label: "Reply #0",
        content: "This is Reply #0 from m0 to m1",
        fromMessage: 0,
        toMessage: 1,
    }, {
        _id: 1,
        label: "Reply #1",
        content: "This is Reply #1 from m0 to m2",
        fromMessage: 0,
        toMessage: 2,
    }
]

class MockDBHandler {
    constructor(uri) {
        this.lastMid = 3
        this.lastRid = 2
        this.messages = mockMessages
        this.replies = mockReplies
    }

    async connect() {
        console.log("Mock DB connected")
    }

    async disconnect() {
        console.log("Mock DB disconnected")
    }
}

module.exports = MockDBHandler