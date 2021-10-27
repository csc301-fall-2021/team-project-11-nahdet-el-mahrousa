const MongoDBHandler = require('../../gateways/db/db.mongoose')
const { MessageDao, ReplyDao } = require('../../dao/mongoose')
const BotService = require('../../services/bot')

// Mock Data
const { admin1 } = require('../../assets/user.mock')
const testMessages = require('../../assets/bot-message.mock').mongoUnitMessages1

describe("BotService.Mongoose Integrated Test", () => {
    const db = new MongoDBHandler("mongodb://localhost:27017/local-dev")
    const messageDao = new MessageDao(db)
    const replyDao = new ReplyDao(db)
    const botService = new BotService(messageDao, replyDao)

    var { User } = require('../../models/models.mongoose')
    const createdMessages = []
    const createdReplies = []
    let admin = null

    async function clearTestData() {
        const msgIds = createdMessages.map(({ _id }) => _id)
        const rplIds = createdReplies.map(({ _id }) => _id)
        for (let mid of msgIds) {
            await messageDao.delete(mid)
            // Removing msg from createdMessages array.
            createdMessages.shift()
        }
        for (let rid of rplIds) {
            await replyDao.delete(mid)
            // Removing msg from createdMessages array.
            createdMessages.shift()
        }

        // Remove admin
        await User.findByIdAndDelete(admin._id)
    }

    beforeAll(async () => {
        await db.connect()
        admin = new User(admin1)
        await admin.save()
    })

    afterAll(async () => {
        // Remove all msg in createdMessages
        await clearTestData()
        await db.disconnect()
    })

    describe("Create Message", () => {
        test("create: msg[0]", async () => {
            const baseMessage = testMessages[0]

            const newMessage = await botService.createMessage(admin, baseMessage.content, baseMessage.label)
            expect(newMessage.content).toEqual(baseMessage.content)
            expect(newMessage.label).toEqual(baseMessage.label)
            createdMessages.push(newMessage)
        });
    });

    describe("Update Message", () => {
        test("update: msg[0] to msg[1]", async () => {
            const baseMessage = testMessages[1]
            const targetMessage = createdMessages[0]

            const newMessage = await botService.updateMessage(admin, targetMessage._id, { content: baseMessage.content })
            expect(newMessage.content).toEqual(baseMessage.content)
            expect(newMessage.label).toEqual(targetMessage.label)
            // Update createdMessage
            createdMessages.shift()
            createdMessages.push(newMessage)
        });
    });


    describe("Create Message 2", () => {
        test("create: msg[1]", async () => {
            const baseMessage = testMessages[1]

            const newMessage = await botService.createMessage(admin, baseMessage.content, baseMessage.label)
            expect(newMessage.content).toEqual(baseMessage.content)
            expect(newMessage.label).toEqual(baseMessage.label)
            createdMessages.push(newMessage)
        });
    });

    // TODO: Test Get methods

    // TODO: Test reply

    describe("Delete Message", () => {
        test("delete: msg[0]", async () => {
            const baseMessage = createdMessages[0]

            const newMessage = await botService.deleteMessage(admin, baseMessage._id)
            expect(newMessage.content).toEqual(baseMessage.content)
            expect(newMessage.label).toEqual(baseMessage.label)
            createdMessages.shift()

            // Ensure the message is not here.
            const queryMessage = await botService.getMessage(baseMessage._id)
            expect(queryMessage).toEqual(null)
        });
    });
});
