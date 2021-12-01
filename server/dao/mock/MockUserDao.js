const logger = { log: console.log }

const MockDBHandler = require('../../gateways/db/db.mock')


class MockUserDao {
    constructor(db) {
        if (db === undefined) {
            this.db = new MockDBHandler()
        } else {
            this.db = db
        }
    }

    /**
     * Create a user.
     * @param {*} {username, password} 
     * @returns New user created.
     */
    async create({ username, password }) {
        const newUser = { _id: this.db.lastRid++, username, password }
        this.db.users.push(newUser)
        logger.log(`CREATED User "${username}"`)
        return newUser
    }

    /**
     * Get a user by id.
     * @param {Integer} uid id of user.
     * @returns Reply; undefined if not found.
     */
    get(uid) {
        return this.db.users.find(user => user._id == uid)
    }

    /**
     * Get all users.
     * @returns Array of users
     */
    getAll() {
        return this.db.users
    }

    /**
     * Search for users that satisfy the filter
     * @param {Object} filter 
     * @returns Array of users.
     */
    search(filter = null) {
        if (filter === null) {
            return this.db.users
        } else {
            let users = this.db.users
            for (let key in filter) {
                users = users.filter(user => !(key in user) || user[key] == filter[key])
            }
            return users
        }
    }

    /**
     * Delete a user.
     * @param {Integer} uid id of user.
     * @returns Deleted user. If user not found, return null.
     */
     async delete(uid) {
        this.db.replies = this.db.replies.filter(rpl => rpl._id != rid)
        logger.log(`DELETED Reply ${rid}`)
        return true
    }

}

module.exports = MockUserDao;