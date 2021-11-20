const bcrypt = require("bcrypt");
const logger = { log: console.log }

class UserService {
    /**
     * Constructor of BotService.
     * @param {UserDao} UserDao 
     */
    constructor(userDao=null) {
        this.userDao = userDao
    }

    setUserDao(userDao) {
        this.userDao = userDao
    }

    /**
     * encrypt password
     * @param {string} password 
     * @returns a string of encrypted password
     */
    async encryptPassword(password) {
        let salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }

    /**
     * Get user based on given username.
     * @param {string} username of the wanted user.
     * @returns A user object.
     */
    async getUser(username) {
        const user = await this.userDao.search({ username: username })
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
        let encryptedPassword = await this.encryptPassword(password)
        const newUser = await this.userDao.create({ username, password: encryptedPassword })

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
        const users = await this.userDao.search({ username: username })
        for(let user of users){
            if(bcrypt.compareSync(password, user.password)){
                return user
            }
        }
        return null
    }

    /**
     * Delete a user.
     * @param {string} username of the user to delete.
     * @returns The User deleted.
     */
     async deleteUser(username) {
        const delUser = await this.getUser(username)
        this.userDao.delete(delUser._id)

        if (delUser !== null) {
            logger.log(`[DELETED User \'${username}\'`)
            return delUser
        } else {
            logger.log(`[FAILED DELETE Message \'${username}\'`)
            return undefined
        }
    }
}


module.exports = UserService
