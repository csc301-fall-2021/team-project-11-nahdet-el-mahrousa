const PRIVILEGES = {
    ACTIVE: 1,        // Account is active
    ADMIN: 2,         // Can log into admin dashboard
    ACCESS_DATA: 3,    // Can view statistic data
    MODIFY_DATA: 4,    // Can modify statistic data
    ACCESS_BOT: 5,     // Can view Bot messages and replies
    MODIFY_BOT: 6      // Can modify Bot messages and replies
}


/**
 * Check the privilege of a user
 * @param {User} user User to be check access.
 * @param {Array} privileges Privileges to be checked.
 * @returns True iff user have the privilege.
 */
function validateAccess(user, privileges) {
    for (let p of privileges) {
        
    }
    return true
}


module.exports = {
    PRIVILEGES,
    validateAccess
}
