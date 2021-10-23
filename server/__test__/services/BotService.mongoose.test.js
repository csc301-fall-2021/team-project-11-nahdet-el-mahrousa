const mongoose = require('mongoose')
const createDB = require('../../gateways/db')
const { MessageDao, ReplyDao } = require('../../dao/mongoose')
const BotService = require('../../services/bot')

// Mock Data
const { admin1 } = require('../../assets/user.mock')

describe("BotService.Mongoose Integrated Test", () => {
    const db = createDB("mongodb://localhost:27017/local-dev")
    const messageDao = new MessageDao(db)
    const replyDao = new ReplyDao(db)
    const botService = new BotService(messageDao, replyDao)

    var { User } = db.models
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

        // TODO: Remove admin
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

        });
    });
});

