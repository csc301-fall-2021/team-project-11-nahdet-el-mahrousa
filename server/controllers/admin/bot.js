const { ReasonPhrases, StatusCodes } = require('http-status-codes')
const { respond, response } = require('../../utils/response')
const getInput = require('../../utils/user-input')
const logger = { log: console.log }


class AdminBotController {
    constructor(botService = null, authService = null) {
        this.botService = botService
        this.authService = authService
    }

    setBotService(botService) {
        this.botService = botService
    }

    setAuthService(authService) {
        this.authService = authService
    }

    /**
     * Get a well formatted bot that combines all questions and replies.
     * @param {Object} req Request.
     * @param {User} user The user doing this operation.
     * @returns Response object.
     */
    async getBot(req, user) {
        // TODO: How to do query.
        const query = req.query
        const result = await this.botService.getBot(user, query)
        return result
    }

    /**
     * Get messages from query.
     * @param {Object} req Request.
     * @param {User} user The user doing this operation.
     * @returns Response object.
     */
    async getMessages(req, user) {
        // TODO: How to do query.
        // Get user input
        const query = req.query

        const result = await this.botService.getMessages(user, query)
        return result
    }

    /**
     * Get user's input to create a message.
     * @param {Object} req Request.
     * @param {User} user The user doing this operation.
     * @returns Response object.
     */
    async createMessage(req, user) {
        // Get user input
        const uin = getInput(req, {
            mandatory: ['content'],
            optional: ['label'],
            optDefaults: { 'label': "" },
            fromBody: true
        })

        // If not all required fields are satisfied, then return.
        if (uin === undefined) {
            return response.NOT_SATISFIED
        } else {
            // Create the message
            const result = await this.botService.createMessage(user, uin.content, uin.label)
            return result
        }
    }


    /**
     * Get user's input to create a reply.
     * @param {Object} req Request.
     * @param {User} user The user doing this operation.
     * @returns Response object.
     */
    async createReply(req, user) {
        // Get user input
        const uin = getInput(req, {
            mandatory: ['content'],
            optional: ['label', 'fromMessage', 'toMessage'],
            optDefaults: { label: "", fromMessage: null, toMessage: null },
            fromBody: true
        })

        // If not all required fields are satisfied, then return.
        if (uin === undefined) {
            return response.NOT_SATISFIED
        } else {
            // Create the reply
            const result = await this.botService.createReply(user, uin.content, uin.label, uin.fromMessage, uin.toMessage)
            return result
        }
    }

    /**
     * Get user's input to delete a message.
     * @param {Object} req Request.
     * @param {User} user The user doing this operation.
     * @returns Response object.
     */
    async deleteMessage(req, user) {
        // Get user input
        const uin = getInput(req, {
            mandatory: ['content'],
            optional: ['label'],
            optDefaults: { 'label': "" },
            fromBody: true
        })

        // If not all required fields are satisfied, then return.
        if (uin === undefined) {
            return response.NOT_SATISFIED
        } else {
            // Create the message
            const result = await this.botService.createMessage(user, uin.content, uin.label)
            return result
        }
    }


    /**
     * Get user's input to delete a reply.
     * @param {Object} req Request.
     * @param {User} user The user doing this operation.
     * @returns Response object.
     */
    async deleteReply(req, user) {
        // Get user input
        const uin = getInput(req, {
            mandatory: ['rid'],
            fromBody: true,
            fromQuery: true
        })

        // If not all required fields are satisfied, then return.
        if (uin === undefined) {
            return response.NOT_SATISFIED
        } else {
            // Create the reply
            const result = await this.botService.createReply(user, uin.content, uin.label, uin.fromMessage, uin.toMessage)
            return result
        }
    }
}

module.exports = AdminBotController
