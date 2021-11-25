import * as http from "utils/http"
// FIXME: mock timer
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Send request to server to fetch admin accounts.
 * @param {*} body Queries.
 * @returns array of accounts.
 */
async function fetchAdmins(body) {
    try {
        const response = await http.get("/user", body)
        return response
    } catch (error) {
        throw error
    }
}

/**
 * Send request to create a new admin.
 * @param {*} body new admin information.
 * @returns Created admin.
 */
async function postNewAdmin(body) {
    try {
        const response = await http.post("/user", body)
        return response
    } catch (error) {
        throw error
    }

}

/**
 * Send request to delete a user.
 * @param {*} body contains _id.
 * @returns deleted user.
 */
async function deleteAdmin(body) {
    try {
        const response = await http.del("/user", body)
        return response
    } catch (error) {
        throw error
    }
}


export {
    fetchAdmins,
    postNewAdmin,
    deleteAdmin
}