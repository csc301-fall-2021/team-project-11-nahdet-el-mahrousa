const logger = require('../../logger')

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
            logger.info(`MONGOOSE CREATING USER`)
            const newUser = new User({ username, password, name })
            const createdUser = await newUser.save()
            await User.findByIdAndUpdate(createdUser._id, { convertedId: createdUser._id.toString() })
            logger.info(`MONGOOSE CREATED User ${createdUser._id}`)
            return newUser
        } catch (err) {
            logger.error(err)
            return null
        }
    }

    /**
     * Get a user by id.
     * @param {Integer} uid id of user.
     * @returns Reply; undefined if not found.
     */
    async get(uid) {
        logger.info(`MONGOOSE GETTING User ${uid}`)
        const user = await User.findById(uid).exec()
        logger.info(`MONGOOSE GET User ${user}`)
        return user
    }

    /**
     * Get all users.
     * @returns Array of users
     */
    async getAll() {
        logger.info(`MONGOOSE GETTING All Users`)
        let users = await User.find().exec()
        logger.info(`MONGOOSE GOT All Users`)
        return users
    }

    /**
     * Search for users that satisfy the filter
     * @param {Object} filter 
     * @returns Array of users.
     */
    async search(filter = null) {
        if (filter) {
            logger.info(`MONGOOSE SEARCHING All Users with filter ${filter}`)
            const users = await User.find(filter).exec()
            logger.info(`MONGOOSE SEARCHED All Users with filter ${filter}`)
            return users
        } else {
            logger.info(`MONGOOSE SEARCHING All Users`)
            const users = await User.find().exec()
            logger.info(`MONGOOSE SEARCHED All Users`)
            return users
        }
    }

    /**
     * Delete a user.
     * @param {Integer} uid id of user.
     * @returns Deleted user. If user not found, return null.
     */
    async delete(uid) {
        logger.info(`MONGOOSE DELETING User ${uid}`)
        const deletedUser = await User.findByIdAndRemove(uid)
        if (deletedUser !== null) {
            logger.info(`MONGOOSE DELETED User ${deletedUser._id}`)
        } else {
            logger.info(`MONGOOSE FAILED DELETE User ${uid}`)
        }
        return deletedUser
    }

}

module.exports = MongooseUserDao;