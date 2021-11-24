const createAuthService = require('../../services/auth/factory')
const AuthController = require('./auth')


function createAuthController() {
    const authService = createAuthService()
    const ac = new AuthController(authService)
    return ac
}


module.exports = createAuthController()
