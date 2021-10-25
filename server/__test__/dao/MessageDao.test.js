const mongoose = require('mongoose')
const createDB = require('../../gateways/db')
const MessageDao = require('../../dao/mongoose/MongooseMessageDao')

// Mock Data
const testMessages = require('../../assets/bot-message.mock').mongoUnitMessages1

// > node_modules/.bin/jest --detectOpenHandles -i "MessageDao.test.js"

describe("Mongoose MessageDao Unit Tests", () => {
    const db = createDB("mongodb://localhost:27017/local-dev")
    const messageDao = new MessageDao(db)
    // var { User, Message, Reply } = require('../../models/models.mongoose')
    const createdMessages = []

    async function clearTestData() {
        const msgIds = createdMessages.map(({ _id }) => _id)
        for (let mid of msgIds) {
            await messageDao.delete(mid)
            // Removing msg from createdMessages array.
            createdMessages.shift()
        }
    }

    beforeAll(async () => {
        await db.connect()
    })

    afterAll(async () => {
        // Remove all msg in createdMessages
        await clearTestData()
        await db.disconnect()
    })

    describe("Create Message", () => {
        test("create: msg[0]", async () => {
            const baseMessage = testMessages[0]

            const newMessage = await messageDao.create(baseMessage)
            expect(newMessage !== undefined).toBeTruthy()
            expect(newMessage.content).toEqual(baseMessage.content)
            expect('_id' in newMessage).toBeTruthy()
            createdMessages.push(newMessage)

            const queryMessage = await messageDao.get(newMessage._id)
            expect(queryMessage._id).toEqual(newMessage._id)
            for (let field of ['label', 'content']) {
                expect(queryMessage[field]).toEqual(baseMessage[field])
            }
        });
    });

    describe("Update Message", () => {
        test("update: msg[0] to msg[1]", async () => {
            const originalMessage = createdMessages[0]
            const baseMessage = testMessages[1]

            const updatedMessage = await messageDao.update(originalMessage._id, baseMessage)
            expect(updatedMessage !== undefined).toBeTruthy()
            expect(updatedMessage.content).toEqual(baseMessage.content)
            createdMessages[0] = updatedMessage

            const queryMessage = await messageDao.get(updatedMessage._id)
            expect(queryMessage._id).toEqual(updatedMessage._id)
            for (let field of ['label', 'content']) {
                expect(queryMessage[field]).toEqual(baseMessage[field])
            }
        });
    });


    describe("Negative Tests", () => {
        describe("Invalid id", () => {
            const targetId = mongoose.Types.ObjectId("111111111111111111111111")
            test("negative query", async () => {
                const queryResult = await messageDao.get(targetId)
                expect(queryResult).toBe(null)
            })

            test("negative update", async () => {
                const updateResult = await messageDao.update(targetId, { content: "negative update invalid id"})
                expect(updateResult).toBe(null)
            })
        })
        
    })
});
