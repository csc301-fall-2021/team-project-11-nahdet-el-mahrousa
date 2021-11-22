import store from "../../store/store";
import { loginAuth, logoutAuth } from "../../store/auths/auth-slice";
import {
  authLogin
} from "../../api/authApi";

function loginAuthUser(userData) {
    store.dispatch(loginAuth(userData));
}

function verifyLogin({ userData }) {
    // if (userData.get("token")){
    //     authorization = 'Bearer ${token}';
    //     return true;
    // }
    // authorization = undefined;
    // return false;
}

function loginAdmin({ username, password }) {
    return authLogin({ username, password }, loginAuthUser);
}

function logoutAdmin({ username, password }) {
    store.dispatch(logoutAuth());
}

export {
    verifyLogin,
    loginAdmin,
    logoutAdmin
}