
// FIXME: mock timer
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAdmins(body) {
    try {
        const msg = "OK"
        const statusCode = 200
        const entity = [
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

        await sleep(500) // FIXME: DELETE ME

        return { msg, statusCode, entity }
    } catch(error) {
        throw error
    }
}


async function postNewAdmin(body) {
    const msg = "OK"
    const statusCode = 200
    const entity = {
        _id: "dwd12dg3gf3e1",
        name: "New Admin",
        username: "newad"
    }
    return { msg, statusCode, entity }
}


export {
    fetchAdmins,
    postNewAdmin
}