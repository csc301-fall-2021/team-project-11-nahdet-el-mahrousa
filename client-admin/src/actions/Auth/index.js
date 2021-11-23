import store from "../../store/store";
import { loginAuth, logoutAuth } from "../../store/auths/auth-slice";
import {
  authLogin
} from "../../api/authApi";

function loginAuthUser(userData) {
    store.dispatch(loginAuth(userData));
    console.log(localStorage.getItem('token'))
}

function verifyLogin({ userData }) {
    // if (userData.get("token")){
    //     authorization = 'Bearer ${token}';
    //     return true;
    // }
    // authorization = undefined;
    // return false;
}

async function loginAdmin({ username, password }) {
    await authLogin({ username, password }, loginAuthUser);
    if (localStorage.getItem('token') && localStorage.getItem('token') !== ''){
        console.log("happy")
        return true;
    }
    console.log(localStorage.getItem('token'))
    return false;
}

function logoutAdmin() {
    store.dispatch(logoutAuth());
}

export {
    verifyLogin,
    loginAdmin,
    logoutAdmin
}