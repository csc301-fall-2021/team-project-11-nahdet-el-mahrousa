import { message } from 'antd'
import { fetchAdmins, postNewAdmin } from "api/AdminAccounts"

async function requestGetAdminAccounts(body) {
    try {
        const response = await fetchAdmins(body)
        if (response.statusCode === 200) {
            return response.entity
        } else {
            message.warning(response.msg)
            return []
        }
    } catch (err) {
        console.log(err)
        message.error(String(err))
    }
}


export {
    requestGetAdminAccounts
}