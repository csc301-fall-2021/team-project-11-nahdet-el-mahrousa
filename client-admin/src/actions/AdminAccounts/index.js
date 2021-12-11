import { message } from 'antd'
import { fetchAdmins, postNewAdmin, deleteAdmin } from "api/AdminAccounts"
import { backToLogin } from "actions/Auth"


async function requestGetAdminAccounts(body) {
    try {
        const response = await fetchAdmins(body)
        if (response.statusCode === 200) {
            return response.entity
        } else if (response.statusCode === 401) {
            // Login expire or not valid, return to login
            backToLogin()
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}


async function requestCreateAdminAccount(body) {
    try {
        const response = await postNewAdmin(body)
        if (response.statusCode === 200) {
            return response.entity
        } else if (response.statusCode === 401) {
            // Login expire or not valid, return to login
            backToLogin()
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}


async function requestDeleteAdminAccount(body) {
    try {
        if (!("_id" in body)) {
            message.warning("Please delete a valid user.")
            return
        }
        const response = await deleteAdmin(body)
        if (response.statusCode === 200) {
            return response.entity
            // throw new Error(response.msg)
        } else if (response.statusCode === 401) {
            // Login expire or not valid, return to login
            backToLogin()
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}


export {
    requestGetAdminAccounts,
    requestCreateAdminAccount,
    requestDeleteAdminAccount
}