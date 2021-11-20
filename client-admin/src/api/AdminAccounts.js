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
        const response = {
            msg: "OK",
            statusCode: 200,
            entity: [
                {
                    _id: "asddqwd1d12e1",
                    name: "Tomas",
                    username: "tomas1231"
                },
                {
                    _id: "asd121assdqw",
                    name: "John",
                    username: "john1231"
                },
            ]
        }
        await sleep(500) // FIXME: DELETE ME

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
        const response = {
            msg: "OK",
            statusCode: 200,
            entity: {
                _id: "dwd12dg3gf3e1",
                name: "New Admin",
                username: body.username
            }
        }
        await sleep(500) // FIXME: DELETE ME

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
        const response = {
            msg: "OK",
            statusCode: 200,
            entity: {
                _id: body._id,
                name: "deleted Admin",
                username: "deletedAdmin"
            }
        }
        await sleep(500) // FIXME: DELETE ME

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