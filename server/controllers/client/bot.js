const logger = {log: console.log}

class ClientBotService{
    constructor(botService = null){
        this.botService = botService
    }

    setBotService(botService){
        this.botService = botService
    }

    /**
     * Get message based on the message id.
     * @param {Object} req Request.
     * @returns A message object with given mid.
     */
    async getMessage(req){
        let mid = -1
        try {
            mid = req.body.mid
        } catch (error) {
            logger.log("Key mid is not found in the request's body")
            return null
        }
        return await this.botService.getMessage(mid)
    }

    /**
     * Get replies based on the message id.
     * @param {Object} req Request.
     * @returns A list of reply object that are replies of the given message.
     */
    async getRepliesByMessage(req){
        let mid = -1
        try {
            mid = req.body.mid
        } catch (error) {
            logger.log("Key mid is not found in the request's body")
            return null
        }
        return await this.botService.getRepliesByMessage(mid)
    }

    /**
     * Helper function: get message and its replies based on the message id.
     * @param {Object} req Request.
     * @returns An object conatin a message and its replies.
     */
    async getFullMessage(req){
        try {
            let mid = req.body.mid
        } catch (error) {
            logger.log("Key mid is not found in the request's body")
            return null
        }
        return {message: await this.getMessage(req), replies: await this.getRepliesByMessage(req)}
    }

    /**
     * Get next message based on the reply id.
     * @param {Object} req Request.
     * @returns A message object that is the next message of given rid.
     */
    async getNextMessage(req){
        let rid = -1
        try {
            rid = req.body.rid
        } catch (error) {
            logger.log("Key rid is not found in the request's body")
            return null
        }
        return await this.botService.getNextMessage(rid)
    }

    /**
     * Get next message and its replies based on the reply id.
     * @param {Object} req Request.
     * @returns An object conatin a message and its replies.
     */
    async getFullNextMessage(req){
        let rid = -1
        try {
            rid = req.body.rid
        } catch (error) {
            logger.log("Key rid is not found in the request's body")
            return null
        }
        return await this.getFullMessage({body: {mid: await this.botService.getNextMessageId(rid)}})
    }
}

module.exports = ClientBotService