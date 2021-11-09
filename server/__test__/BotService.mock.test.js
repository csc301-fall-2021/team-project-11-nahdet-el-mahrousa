const User = require('../models/User')
const BotService = require('../services/bot')
const MockDBHandler = require('../gateways/db/db.mock')
const MockMessageDao = require('../dao/mock/MockMessageDao')
const MockReplyDao = require('../dao/mock/MockReplyDao')
const {admin1} = require('../assets/user.mock')


describe("BotService.Mock", () => {
    const db = new MockDBHandler()
    const mDao = new MockMessageDao(db)
    const rDao = new MockReplyDao(db)
    const bot = new BotService(mDao, rDao)
    const admin = admin1

    // TODO: modify this test to make it usable
    /*
    describe("Test Message Functions (Positive)", () => {
        test("create", async () => {
            let actual = await bot.createMessage(admin, "Welcome", "welcome message");
            expect(actual.content).toBe("welcome message");
        });
    });
    */

    describe("Test Get Message Functions (Positive)", () => {
        test("get", async () => {
            let actual = await bot.getMessage(0);
            const expected = {
                              _id: 0,
                              label: "Message #0",
                              content: "This is Message #0"
                             };
            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });
    });

    describe("Test Get Message Functions (Negative)", () => {
        test("get", async () => {
            let actual = await bot.getMessage(3);
            const expected = undefined;
            expect(actual).toBe(expected);
        });
    });

    describe("Test Get Reply Functions (Positive)", () => {
        test("get", async () => {
            let actual = await bot.getReply(0);
            const expected = {
                              _id: 0,
                              label: "Reply #0",
                              content: "This is Reply #0 from m0 to m1",
                              fromMessage: 0,
                              toMessage: 1,
                             };
            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });
    });

    describe("Test Get Reply Functions (Negative)", () => {
        test("get", async () => {
            let actual = await bot.getReply(3);
            const expected = undefined;
            expect(actual).toBe(expected);
        });
    });

    describe("Test Get getRepliesByMessage Functions (Positive)", () => {
        test("get", async () => {
            let actual = await bot.getRepliesByMessage(0);
            const expected1 = {
                               _id: 0,
                               label: "Reply #0",
                               content: "This is Reply #0 from m0 to m1",
                               fromMessage: 0,
                               toMessage: 1,
                              };
            const expected2 = {
                               _id: 1,
                               label: "Reply #1",
                               content: "This is Reply #1 from m0 to m2",
                               fromMessage: 0,
                               toMessage: 2,
                              };
            expect(JSON.stringify(actual[0])).toBe(JSON.stringify(expected1));
            expect(JSON.stringify(actual[1])).toBe(JSON.stringify(expected2));
        });
    });

    describe("Test Get Message Functions (Negative)", () => {
        test("get", async () => {
            let actual = await bot.getRepliesByMessage(3);
            const expected = undefined
            expect(actual).toBe(expected);
        });
    });

    describe("Test Get getNextMessage Functions (Positive)", () => {
        test("get", async () => {
            let actual = await bot.getNextMessage(0);
            const expected = {
                              _id: 1,
                              label: "Message #1",
                              content: "This is Message #1"
                             };
            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });
    });

    describe("Test Get getNextMessage Functions (Negative)", () => {
        test("get", async () => {
            let actual = await bot.getNextMessage(3);
            const expected = undefined;
            expect(actual).toBe(expected);
        });
    });
});
