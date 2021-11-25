const bcrypt = require("bcrypt");
const logger = { log: console.log }

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
        const user = await this.userDao.search({ username: username })
        if (user.length === 0) {
            logger.log(`User [${username}] doesn't exist`)
            return null
        }
        return user[0]
    }

    /**
     * Get users based on given keyword.
     * @param {string} keyword of the wanted users.
     * @returns A user object array.
     */
     async getUsers(keyword) {
        const users = await this.userDao.search({ username: new RegExp(".*" + keyword + ".*", "i") })
        return users
    }

    /**
     * Create a user.
     * @param {String} username 
     * @param {String} password 
     * @returns New User. If fail to create, return null.
     */
    async createUser(username, password) {
        // Check unique username
        const checkUsername = await this.userDao.search({ username })
        if (checkUsername.length > 0) {
            logger.log(`FAILED CREATED User ${username}: Username already exists.`)
            return null
        }

        const encryptedPassword = await this._encryptPassword(password)
        const newUser = await this.userDao.create({ username, password: encryptedPassword })

        if (newUser !== null) {
            logger.log(`CREATED User ${newUser.username} `)
            // const { password, ...ret } = newUser
            return  { _id: newUser._id, username: newUser.username}
        } else {
            logger.log(`FAILED CREATE User \'${username}\'`)
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
        const users = await this.userDao.search({ username: username })
        for (let user of users) {
            if (bcrypt.compareSync(password, user.password)) {
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
        if (delUser === null) {
            return null
        }

        const deletedUser = await this.userDao.delete(delUser._id)

        if (deletedUser !== null) {
            logger.log(`DELETED User \'${username}\'`)
            // const { password, ...ret } = deletedUser
            // console.log(deletedUser)
            return { _id: deletedUser._id, username: deletedUser.username}
        } else {
            logger.log(`FAILED DELETE User \'${username}\'`)
            return null
        }
    }
}


module.exports = UserService
