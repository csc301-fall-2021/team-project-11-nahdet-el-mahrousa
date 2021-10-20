const mongoose = require('mongoose')
const createDB = require('../gateways/db')

describe("Mongoose Unit Tests", () => {
    const db = createDB("mongodb://localhost:27017/local-dev")
    var {User, Message, Reply} = db.models

    beforeAll(async () => {
        await db.connect()
    })
    
    describe("Test Message", () => {
         test("create", () => {
            const newMessage = new Message({ content: "Test message", label: "test message"})
            newMessage.save( err => {
                if (err) console.log(err)
            })
            console.log(`Created newMessage ${newMessage}`)

            Message.findOne({label: newMessage.label}, (err, queryMessage) => {
                if (err) {
                    console.log(err)
                } 
                
                // console.log(`Found queryMessage ${queryMessage}`)
                    expect(queryMessage.content).toEqual(newMessage.content)
                // }
            })
            // const expected = true;
            // expect(actual).toBe(expected);
        });
    });
});
