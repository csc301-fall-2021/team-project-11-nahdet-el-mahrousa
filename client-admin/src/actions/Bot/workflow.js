import { fetchWorkflow } from "api/botWorkflow"
import { backToLogin } from "actions/Auth"

function _formatWorkflow(workflow) {
    function trimString(str) {
        const lengthLimit = 25
        return str.length > lengthLimit ? str.substring(0, lengthLimit) + "..." : str
    }

    const formattedWorkflow = {}

    formattedWorkflow.edges = workflow.edges.map(edge => {
        // console.log(edge.value.length)
        const ret = {
            ...edge,
            value: trimString(edge.value)
        }
        return ret
    })

    formattedWorkflow.nodes = workflow.nodes.map(node => {
        // console.log(edge.value.length)
        const items = node.value.items.map(i => {
            return {
                ...i,
                value: trimString(i.value)
            }
        })

        const ret = {
            ...node,
            value: {
                ...node.value,
                title: trimString(node.value.title),
                items
            }
        }
        return ret
    })

    return formattedWorkflow
}

async function requestGetBotWorkflow(body) {
    try {
        const response = await fetchWorkflow(body)
        if (response.statusCode === 200) {
            // Format body, to trim characters.
            const workflow = _formatWorkflow(response.entity)
            return workflow
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