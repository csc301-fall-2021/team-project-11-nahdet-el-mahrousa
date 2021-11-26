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
        const query = {}
        for(let key of Object.keys(req.query)){
            let value = new RegExp(".*" + req.query[key] + ".*", "i")
            if(key === "_id"){
                query.convertedId = value
            } else {
                query[key] = value
            }
        }
        const result = await this.botService.getBot(user, query)
        if (result === null) {
            return response.FORBIDDEN
        } else {
            return respond({ entity: result })
        }
    }

    /**
     * Create a well formatted workflow.
     * @param {Object} req Request.
     * @param {User} user The user doing this operation.
     * @returns Response object.
     */
     async getWorkflow(req, user) {
        const query = {}
        for(let key of Object.keys(req.query)){
            let value = new RegExp(".*" + req.query[key] + ".*", "i")
            if(key === "_id"){
                query.convertedId = value
            } else {
                query[key] = value
            }
        }
        const result = await this.botService.getWorkflow(user, query)
        if (result === null) {
            return response.FORBIDDEN
        } else {
            return respond({ entity: result })
        }
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
        const query = {}
        for(let key of Object.keys(req.query)){
            let value = new RegExp(".*" + req.query[key] + ".*", "i")
            if(key === "_id"){
                query.convertedId = value
            } else {
                query[key] = value
            }
        }
        const result = await this.botService.getMessages(user, query)
        if (result === null) {
            return response.FORBIDDEN
        } else {
            return respond({ entity: result })
        }
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
        if (uin === null) {
            return response.NOT_SATISFIED
        } else if ((await this.botService.getInitMessage()) && uin.label === "__init__"){
            return response.FORBIDDEN
        } else {
            // Create the message
            const result = await this.botService.createMessage(user, uin.content, uin.label)
            if (result === null) {
                return response.FORBIDDEN
            } else {
                return respond({ entity: result })
            }
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
            mandatory: ['_id'],
            fromBody: true,
            fromQuery: true
        })

        // If not all required fields are satisfied, then return.
        if (uin === null) {
            return response.NOT_SATISFIED
        } else if ((await this.botService.getInitMessage()).convertedId === uin._id) {
            return response.FORBIDDEN
        } else {
            // Delete the message
            const result = await this.botService.deleteMessage(user, uin._id)
            if (result === null) {
                return response.FORBIDDEN
            } else if (result === undefined) {
                return response.NOT_FOUND
            } else {
                return respond({ entity: result })
            }
        }
    }

    /**
     * Get user's input to update a message.
     * @param {Object} req Request.
     * @param {User} user The user doing this operation.
     * @returns Response object.
     */
    async updateMessage(req, user) {
        // Get user input
        const uin = getInput(req, {
            mandatory: ['_id'],
            optional: ['label', 'content'],
            fromBody: true
        })

        // If not all required fields are satisfied, then return.
        if (uin === null) {
            return response.NOT_SATISFIED
        } else {
            // Update the message
            const { _id, ...updateBody } = uin  // This filters out id from uin.
            const result = await this.botService.updateMessage(user, _id, updateBody)
            if (result === null) {
                return response.FORBIDDEN
            } else if (result === undefined) {
                return response.NOT_FOUND
            } else {
                return respond({ entity: result })
            }
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
            mandatory: ['content', 'fromMessage'],
            optional: ['label', 'toMessage'],
            optDefaults: { label: "", fromMessage: null, toMessage: null },
            fromBody: true
        })

        // If not all required fields are satisfied, then return.
        if (uin === null) {
            return response.NOT_SATISFIED
        } else {
            // Create the reply
            const result = await this.botService.createReply(user, uin.content, uin.label, uin.fromMessage, uin.toMessage)
            if (result === null) {
                return response.FORBIDDEN
            } else {
                return respond({ entity: result })
            }
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
            mandatory: ['_id'],
            fromBody: true,
            fromQuery: true
        })

        // If not all required fields are satisfied, then return.
        if (uin === null) {
            return response.NOT_SATISFIED
        } else {
            // Delete the reply
            const result = await this.botService.deleteReply(user, uin._id)
            if (result === null) {
                return response.FORBIDDEN
            } else if (result === undefined) {
                return response.NOT_FOUND
            } else {
                return respond({ entity: result })
            }
        }
    }

    /**
     * Get user's input to update a reply.
     * @param {Object} req Request.
     * @param {User} user The user doing this operation.
     * @returns Response object.
     */
    async updateReply(req, user) {
        // Get user input
        const uin = getInput(req, {
            mandatory: ['_id'],
            optional: ['label', 'content', 'fromMessage', 'toMessage'],
            fromBody: true
        })

        // If not all required fields are satisfied, then return.
        if (uin === null) {
            return response.NOT_SATISFIED
        } else {
            // Update the reply
            const { _id, ...updateBody } = uin  // This filters out id from uin.
            // Filter invalid input
            for (let key of ["toMessage", "fromMessage"]){
                if (key in updateBody && updateBody[key] === ""){
                    updateBody[key] = null
                }
            }
            
            const result = await this.botService.updateReply(user, _id, updateBody)
            if (result === null) {
                return response.FORBIDDEN
            } else if (result === undefined) {
                return response.NOT_FOUND
            } else {
                return respond({ entity: result })
            }
        }
    }
}

module.exports = AdminBotController
