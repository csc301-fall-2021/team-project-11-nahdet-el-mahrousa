import { fetchWorkflow } from "api/botWorkflow"

async function requestGetBotWorkflow(body) {
    try {
        const response = await fetchWorkflow(body)
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


export {
    requestGetBotWorkflow
}