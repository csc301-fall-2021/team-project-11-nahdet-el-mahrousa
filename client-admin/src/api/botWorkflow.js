import * as http from "utils/http"
// FIXME: mock timer
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const data = function () {
    const nodes = []
    const edges = []

    for (let i = 0; i < 7; i++) {
        nodes.push({
            id: `question${i * 100000}`,
            value: {
                title: `Label Q${i * 100000}`,
                items: [
                    {
                        text: '_id',
                        value: `question${i * 100000}`,
                    },
                    {
                        text: 'content',
                        value: `Q${i * 100000} content`,
                    },
                ],
            },
        })
    }

    for (let i = 0; i < 3; i++) {
        edges.push({
            source: `question${i * 100000}`,
            target: `question${(i * 2 + 1) * 100000}`,
            value: `response label ${i}.${1}`,
        })
        edges.push({
            source: `question${i * 100000}`,
            target: `question${(i * 2 + 2) * 100000}`,
            value: `response label ${i}.${2}`,
        })
    }

    return { nodes, edges }
}()


async function fetchWorkflow(params = {}) {
    try {
        const response = {
            msg: "OK",
            statusCode: 200,
            entity: data
        }
        
        return response
    } catch (error) {
        throw error
    }
}

export {
    fetchWorkflow
}