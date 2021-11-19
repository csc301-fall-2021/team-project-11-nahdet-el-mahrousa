import { message } from 'antd'
import { fetchAdmins, postNewAdmin, deleteAdmin } from "api/AdminAccounts"


async function requestGetAdminAccounts(body) {
    try {
        const response = await fetchAdmins(body)
        if (response.statusCode === 200) {
            return response.entity
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}


async function requestCreateAdminAccount(body) {
    try {
        const response = await postNewAdmin(body)
        if (response.statusCode === 200) {
            return response.entity
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.log(err)
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
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}


export {
    requestGetAdminAccounts,
    requestCreateAdminAccount,
    requestDeleteAdminAccount
}