const logger = { log: console.log }
const { username, password } = require('../../models/User')
const { respond, response } = require('../../utils/response')

class AuthController {
    constructor(authService = null) {
        this.authService = authService
    }

    setAuthService(authService) {
        this.authService = authService
    }

    async createUser(req) {
        const uin = getInput(req, {
            mandatory: ['username', 'password'],
            fromBody: true
        })
        if (uin === undefined) {
            return undefined
        } else if(this.authService.getUser(uin.username)) {
            return undefined
        } else {
            const result = await this.authService.createUser(uin.username, uin.password)
            if (result === null) {
                return undefined
            } else {
                return respond({ entity: result })
            }
        }
    }

    async deleteUser(req) {
        const uin = getInput(req, {
            mandatory: ['username'],
            fromBody: true
        })
        if (uin === undefined) {
            return null
        } else {
            return await this.authService.deleteUser(uin.username)
        }
    }

    async login(req) {
        const uin = getInput(req, {
            mandatory: ['username', 'password'],
            fromBody: true
        })
        if (uin === undefined) {
            return null
        } else {
            return await this.authService.login(bin.username, bin.password)
        }
    }
}

module.exports = AuthController