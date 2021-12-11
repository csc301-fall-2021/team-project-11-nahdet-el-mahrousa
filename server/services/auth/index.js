const bcrypt = require("bcrypt");
const logger = require('../../logger')

class UserService {
    /**
     * Constructor of BotService.
     * @param {UserDao} UserDao 
     */
    constructor(userDao = null) {
        this.userDao = userDao
    }

    setUserDao(userDao) {
        this.userDao = userDao
    }

    /**
     * Encrypt plain password.
     * @param {String} password plain password
     * @returns a string of encrypted password.
     */
    async _encryptPassword(password) {
        let salt = await bcrypt.genSalt()
        return await bcrypt.hash(password, salt)
    }

    /**
     * Get user based on given username.
     * @param {string} username of the wanted user.
     * @returns A user object.
     */
    async getUser(username) {
        logger.info(`Service: Getting User with ${username}`)
        const user = await this.userDao.search({ username: username })
        if (user.length === 0) {
            logger.info(`Service: User [${username}] doesn't exist`)
            return null
        }
        logger.info(`Service: Got User with ${username}`)
        return user[0]
    }

    /**
     * Get users based on given a key value pair.
     * @param {string} key the key searching.
     * @param {string} value of the key.
     * @returns A user object array.
     */
     async getUsers(key, value) {
        logger.info(`Service: Getting User with key: ${key} and value: ${value}`)
        if(key === "_id"){
            key = "convertedId"
        }
        const users = await this.userDao.search({ [key]: new RegExp(".*" + value + ".*", "i") })
        const result = []
        for(let user of users){
            result.push({ _id: user._id, username: user.username, name: user.name })
        }
        logger.info(`Service: Got User with key: ${key} and value: ${value}`)
        return result
    }

    /**
     * Create a user.
     * @param {String} username 
     * @param {String} password 
     * @param {String} name
     * @returns New User. If fail to create, return null.
     */
    async createUser(username, password, name) {
        // Check unique username
        logger.info(`Service: Creating User ${username}`)
        const checkUsername = await this.userDao.search({ username })
        if (checkUsername.length > 0) {
            logger.info(`Service: Failed Created User ${username}: Username already exists.`)
            return null
        }

        const encryptedPassword = await this._encryptPassword(password)
        const newUser = await this.userDao.create({ username, password: encryptedPassword, name })

        if (newUser !== null) {
            logger.info(`Service: Created User ${newUser.username} `)
            // const { password, ...ret } = newUser
            return  { _id: newUser._id, username: newUser.username, name: newUser.name}
        } else {
            logger.info(`Service: Failed Creating User \'${username}\'`)
            return null
        }
    }

    /**
     * Check if the username and password match a existing user
     * @param {String} username 
     * @param {String} password 
     * @returns User if match, null otherwise
     */
    async login(username, password) {
        logger.info(`Service: Logging In for User ${username}`)
        const users = await this.userDao.search({ username: username })
        for (let user of users) {
            if (bcrypt.compareSync(password, user.password)) {
                logger.info(`Service: Logged In for User ${username}`)
                return user
            }
        }
        logger.info(`Service: Failed Logged In for User ${username}`)
        return null
    }

    /**
     * Delete a user.
     * @param {string} username of the user to delete.
     * @returns The User deleted.
     */
    async deleteUser(username) {
        logger.info(`Service: Deleting User ${username}`)
        const delUser = await this.getUser(username)
        if (delUser === null) {
            return null
        }

        const deletedUser = await this.userDao.delete(delUser._id)

        if (deletedUser !== null) {
            logger.info(`Service: Deleted User \'${username}\'`)
            // const { password, ...ret } = deletedUser
            // console.log(deletedUser)
            return { _id: deletedUser._id, username: deletedUser.username}
        } else {
            logger.info(`Service: Failed Deleting User \'${username}\'`)
            return null
        }
    }
}


module.exports = UserService
