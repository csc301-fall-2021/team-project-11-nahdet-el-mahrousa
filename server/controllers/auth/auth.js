const logger = { log: console.log }
// const { username, password } = require('../../models/User')
const { respond, response } = require('../../utils/response')
const getInput = require('../../utils/user-input')
const jwt = require('jsonwebtoken');

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

        if (uin === null) {
            return response.NOT_SATISFIED
        } else if (await this.authService.getUser(uin.username) !== null) {
            return respond({ msg: "Username already taken", statusCode: 400 })
        } else {
            logger.log(`User does not exist, allow creation.`)
            const result = await this.authService.createUser(uin.username, uin.password)
            if (result === null) {
                return response.INTERNAL_SERVER_ERROR
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
        if (uin === null) {
            return response.NOT_SATISFIED
        } else {
            const deletedUser = await this.authService.deleteUser(uin.username)
            if (deletedUser === null) {
                return response.NOT_FOUND
            } else {
                return respond({ entity: deletedUser })
            }
        }
    }

    async login(req) {
        const uin = getInput(req, {
            mandatory: ['username', 'password'],
            fromBody: true
        })

        if (uin === null) {
            return response.NOT_SATISFIED
        } else {
            const loginUser = await this.authService.login(uin.username, uin.password)
            // If login failed, it means the username does not match
            if (loginUser === null) {
                return response.FORBIDDEN
            }

            // Username and password matches, then we can create jwt token.
            let accessToken = jwt.sign({ _id: loginUser._id, username: loginUser.username }, process.env.SECRET_KEY, { expiresIn: "30m" })
            return respond({ entity: { accessToken } })
        }
    }
}

module.exports = AuthController