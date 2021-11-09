const logger = { log: console.log }
const { respond, response } = require('../../utils/response')

class ClientBotService {
    constructor(botService = null) {
        this.botService = botService
    }

    setBotService(botService) {
        this.botService = botService
    }

    /**
     * Get message based on the message id.
     * @param {Object} req Request.
     * @returns A message object with given mid.
     */
    async getMessage(req) {
        let mid = -1
        logger.log(req)
        try {
            mid = req.body._id
        } catch (error) {
            logger.log("Key mid is not found in the request's body")
            return response.NOT_SATISFIED
        }
        if (mid === -1) {
            return await this.botService.getInitMessage()
        }
        return await this.botService.getMessage(mid)
    }

    /**
     * Get first message __init__.
     * @returns A message object.
     */
    async getInitMessage() {
        try {
            const message = await this.botService.getInitMessage()
            if (message === null) {
                return respond({ msg: "Cannot find message with __init__ label. There must be a message with __init__ label to be the first message!" })
            }
            const replies = await this.botService.getRepliesByMessage(message._id)
            return respond({ entity: { message, replies } })
        } catch {
            return response.SERVICE_UNAVAILABLE
        }
    }

    /**
     * Get replies based on the message id.
     * @param {Object} req Request.
     * @returns A list of reply object that are replies of the given message.
     */
    async getRepliesByMessage(req) {
        let mid = -1
        try {
            mid = req.body._id
        } catch (error) {
            logger.log("Key mid is not found in the request's body")
            return response.NOT_SATISFIED
        }
        return await this.botService.getRepliesByMessage(mid)
    }

    /**
     * Helper function: get message and its replies based on the message id.
     * @param {Object} req Request.
     * @returns An object contains a message and its replies.
     */
    async getFullMessage(req) {
        try {
            const message = await this.getMessage(req)
            const replies = await this.getRepliesByMessage(req)
            return respond({ entity: { message, replies } })
        } catch (error) {
            logger.log("Key mid is not found in the request's body")
            return response.NOT_SATISFIED
        }
    }

    /**
     * Get next message based on the reply id.
     * @param {Object} req Request.
     * @returns A message object that is the next message of given rid.
     */
    async getNextMessage(req) {
        let rid = -1
        try {
            rid = req.body._id
        } catch (error) {
            logger.log("Key rid is not found in the request's body")
            return response.NOT_SATISFIED
        }
        return await this.botService.getNextMessage(rid)
    }

    /**
     * Get next message and its replies based on the reply id.
     * @param {Object} req Request.
     * @returns An object conatin a message and its replies.
     */
    async getFullNextMessage(req) {
        try {
            const rid = req.body._id
            const nextMessage = await this.botService.getNextMessage(rid)
            if (nextMessage === undefined) {
                return response.NOT_FOUND
            } else if (nextMessage === null) {
                return respond({})
            }

            const replies = await this.botService.getRepliesByMessage(nextMessage._id)

            return respond({ entity: { message: nextMessage, replies } })
        } catch (error) {
            logger.log(error)
            logger.log("Key rid is not found in the request's body")
            return response.NOT_SATISFIED
        }

    }
}

module.exports = ClientBotService