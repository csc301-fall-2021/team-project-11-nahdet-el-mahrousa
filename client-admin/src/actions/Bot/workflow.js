import { fetchWorkflow } from "api/botWorkflow"
import { backToLogin } from "actions/Auth"

async function requestGetBotWorkflow(body) {
    try {
        const response = await fetchWorkflow(body)
        if (response.statusCode === 200) {
            return response.entity
        } else if (response.statusCode === 401) {
            // Login expire or not valid, return to login
            backToLogin()
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}


export {
    requestGetBotWorkflow
}