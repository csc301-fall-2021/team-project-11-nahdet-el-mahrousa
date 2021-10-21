const User = require('../models/User')
const BotService = require('../services/bot')
const MockDBHandler = require('../dao/botDbHandler.mock')
const {admin1} = require('../assets/user.mock')


describe("BotService.Mock", () => {
    const db = new MockDBHandler()
    const bot = new BotService(db);
    const admin = admin1

    describe("Test Message Functions (Positive)", () => {
        test("create", async () => {
            let actual = await bot.createMessage(admin, "Welcome", "welcome message");
            expect(actual.content).toBe("welcome message");
        });
    });

    describe("Test Get Message Functions (Positive)", () => {
        test("get", async () => {
            let actual = await bot.getMessage(0);
            const expectedLable = 0;
            expect(actual.label).toBe(expectedLable);
        });
    });

    describe("Test Get Message Functions (Negative)", () => {
        test("get", async () => {
            let actual = await bot.getMessage(3);
            const expected = 502;
            expect(actual).toBe(expected);
        });
    });

    describe("Test Get Reply Functions (Positive)", () => {
        test("get", async () => {
            let actual = await bot.getReply(0);
            const expectedLable = 0;
            expect(actual.lable).toBe(expectedLable);
        });
    });

    describe("Test Get Reply Functions (Negative)", () => {
        test("get", async () => {
            let actual = await bot.getReply(3);
            const expected = 502;
            expect(actual).toBe(expected);
        });
    });

    describe("Test Get getRepliesByMessage Functions (Positive)", () => {
        test("get", async () => {
            let actual = await bot.getRepliesByMessage(0);
            const expectedLable1 = 0;
            const expectedLable2 = 1;
            expect(actual[0].lable).toBe(expectedLable1);
            expect(actual[1].lable).toBe(expectedLable2);
        });
    });

    describe("Test Get Message Functions (Negative)", () => {
        test("get", async () => {
            let actual = await bot.getRepliesByMessage(3);
            const expected = 502;
            expect(actual).toBe(expected);
        });
    });

    describe("Test Get getNextMessage Functions (Positive)", () => {
        test("get", async () => {
            let actual = await bot.getNextMessage(0);
            const expectedLable = 1;
            expect(actual.lable).toBe(expectedLable);
        });
    });

    describe("Test Get getNextMessage Functions (Negative)", () => {
        test("get", async () => {
            let actual = await bot.getNextMessage(3);
            const expected = 502;
            expect(actual).toBe(expected);
        });
    });
});
