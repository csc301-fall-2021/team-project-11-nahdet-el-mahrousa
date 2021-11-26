const logger = { log: console.log }

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
        return null
    }

    /**
     * Get a user by id.
     * @param {Integer} uid id of user.
     * @returns Reply; undefined if not found.
     */
    get(uid) {
        return null
    }

    /**
     * Get all users.
     * @returns Array of users
     */
    getAll() {
        return null
    }

    /**
     * Search for users that satisfy the filter
     * @param {Object} filter 
     * @returns Array of users.
     */
    search(filter = null) {
        return null
    }

    /**
     * Delete a user.
     * @param {Integer} uid id of user.
     * @returns Deleted user. If user not found, return null.
     */
     async delete(uid) {
        return null
    }

}

module.exports = UserDao;