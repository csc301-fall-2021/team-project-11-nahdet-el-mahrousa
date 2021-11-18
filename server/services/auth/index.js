const CryptoJS = require("crypto-js");
const logger = { log: console.log }

class UserService {
    /**
     * Constructor of BotService.
     * @param {UserDao} UserDao 
     */
    constructor(UserDao=null) {
        this.UserDao = UserDao
    }

    setUserDao(UserDao) {
        this.UserDao = UserDao
    }

    /**
     * encrypt password
     * @param {string} password 
     * @returns a string of encrypted password
     */
    encryptPassword(password) {
        return CryptoJS.AES.encrypt(password, "secret key nm bot").toString()
    }

    /**
     * Get user based on given username.
     * @param {string} username of the wanted user.
     * @returns A user object.
     */
    async getUser(username) {
        const user = await this.UserDao.search({ username: username })
        if (!user) {
            logger.log(`User [${username}] doesn't exist`)
            return user
        }
        return user
    }

    /**
     * Create a user.
     * @param {String} username 
     * @param {String} password 
     * @returns New User. If fail to create, return null.
     */
    async createUser(username, password) {
        let encryptedPassword = this.encryptPassword(password)
        const newUser = await this.UserDao.create({ username, password: encryptedPassword })

        if (newUser !== null) {
            logger.log(`CREATED User ${newUser.username} `)
            return newUser
        } else {
            logger.log(`FAILED CREATE User \'${newUser.username}\'`)
            return newUser
        }
    }

    /**
     * Check if the username and password match a existing user
     * @param {String} username 
     * @param {String} password 
     * @returns True if match, flase otherwise
     */
    async login(username, password) {
        let encryptedPassword = this.encryptPassword(password)
        const users = await this.UserDao.search({ username: username, password: encryptedPassword })
        if (users.length == 0){
            return false
        }
        return true
    }
}


module.exports = UserService
