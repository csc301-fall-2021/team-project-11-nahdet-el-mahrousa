const logger = { log: console.log }

const { User } = require('../../models/models.mongoose')

class MongooseUserDao {
    constructor(db = null) {
        this.db = db
    }

    /**
     * Create a user.
     * @param {*} {username, password} 
     * @returns New user created.
     */
    async create({ username, password, name }) {
        try {
            const newUser = new User({ username, password, name })
            const createdUser = await newUser.save()
            await User.findByIdAndUpdate(createdUser._id, { convertedId: createdUser._id.toString() })
            logger.log(`MONGOOSE CREATED User ${createdUser._id}`)
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
    async get(uid) {
        const user = await User.findById(uid).exec()
        logger.log(`MONGOOSE GET User ${user}`)
        return user
    }

    /**
     * Get all users.
     * @returns Array of users
     */
    async getAll() {
        return await User.find().exec()
    }

    /**
     * Search for users that satisfy the filter
     * @param {Object} filter 
     * @returns Array of users.
     */
    async search(filter = null) {
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
            logger.log(`MONGOOSE DELETED User ${deletedUser._id}`)
        } else {
            logger.log(`MONGOOSE FAILED DELETE User ${uid}`)
        }
        return deletedUser
    }

}

module.exports = MongooseUserDao;