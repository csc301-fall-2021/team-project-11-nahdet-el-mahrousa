import {
    authLogin
} from "api/auth"


async function loginAdmin({ username, password }) {
    try {
        const response = await authLogin({ username, password });
        if (response.statusCode === 200) {
            // Login successfully
            const token = response.entity.accessToken
            localStorage.setItem("token", token)
            return true
        } else if (response.statusCode === 403) {
            // If invalid credential (wrong username password)
            return false
        }else {
            throw new Error(response.msg)
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

function logoutAdmin() {
    // store.dispatch(logoutAuth());
    localStorage.removeItem('token')
}

function backToLogin() {
    document.location.href = '/login'
}

export {
    loginAdmin,
    logoutAdmin,
    backToLogin
}