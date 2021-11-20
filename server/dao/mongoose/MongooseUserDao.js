const logger = { log: console.log }

const { User } = require('../../models/models.mongoose')

class UserDao {
    constructor(db) {
        this.db = db
    }

    /**
     * Create a user.
     * @param {*} {username, password} 
     * @returns New user created.
     */
    async create({ username, password }) {
        try {
            const newUser = new User({ username, password })
            const createdUser = await newUser.save()
            logger.log(`MONGOOSE CREATED Reply ${createdUser._id}`)
            return newUser
        } catch (err) {
            logger.log(err)
            return null
        }
    }

    /**
     * Get a user by id.
     * @param {Integer} uid id of user.
     * @returns Reply; undefined if not found.
     */
    get(uid) {
        const user = await User.findById(uid).exec()
        logger.log(`MONGOOSE GET Reply ${user}`)
        return user
    }

    /**
     * Get all users.
     * @returns Array of users
     */
    getAll() {
        return await User.find().exec()
    }

    /**
     * Search for users that satisfy the filter
     * @param {Object} filter 
     * @returns Array of users.
     */
    search(filter = null) {
        if (filter) {
            const users = await User.find(filter).exec()
            return users
        } else {
            const users = await User.find().exec()
            return users
        }
    }

    /**
     * Delete a user.
     * @param {Integer} uid id of user.
     * @returns Deleted user. If user not found, return null.
     */
     async delete(uid) {
        const deletedUser = await User.findByIdAndRemove(uid)
        if (deletedUser !== null) {
            logger.log(`MONGOOSE DELETED Reply ${deletedUser._id}`)
        } else {
            logger.log(`MONGOOSE FAILED DELETE Reply ${uid}`)
        }
        return deletedUser
    }

}

module.exports = UserDao;