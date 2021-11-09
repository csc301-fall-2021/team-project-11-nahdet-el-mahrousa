const { describe } = require('jest-circus');
const mongoose = require('mongoose')
const MongoDBHandler = require('../../gateways/db/db.mongoose')

describe("Mongoose Unit Tests", () => {
    const db = new MongoDBHandler("mongodb://localhost:27017/local-dev")
    const {User, Message, Reply} = require('../../models/models.mongoose')

    beforeAll(async () => {
        await db.connect()
        
    })

    afterAll(async () => {
        await db.disconnect()
    })

    describe("NULL", () => { 
        test("null", () => {

        })
     })

    // describe("Test Message", () => {
    //      test("create", () => {
    //         // const newMessage = new Message({ content: "Test message", label: "test message"})
    //         // newMessage.save( err => {
    //         //     if (err) console.log(err)
    //         // })
    //         // console.log(`Created newMessage ${newMessage}`)

    //         // Message.findOne({label: newMessage.label}, (err, queryMessage) => {
    //         //     if (err) {
    //         //         console.log(err)
    //         //     } 

    //         //     // console.log(`Found queryMessage ${queryMessage}`)
    //         //         expect(queryMessage.content).toEqual(newMessage.content)
    //         //     // }
    //         // })
    //     });
    // });
});
