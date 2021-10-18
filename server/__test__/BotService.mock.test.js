const User = require('../models/User')
const BotService = require('../services/bot')
const MockDBHandler = require('../gateways/db/db.mock')
const {admin1} = require('../assets/user.mock')


describe("BotService.Mock", () => {
    const db = new MockDBHandler()
    const bot = new BotService(db);
    const admin = admin1

    describe("Test Message Functions (Positive)", () => {
        test("create", async () => {
            let actual = await bot.createMessage(admin, "Welcome", "welcome message");
            const expected = 200;
            expect(actual).toBe(expected);
        });
    });
});
