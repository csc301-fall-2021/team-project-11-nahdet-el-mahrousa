

function verifyLogin({ username, password }) {
    // TODO: send request
    return username === "admin" && password === "admin"
}

export {
    verifyLogin
}