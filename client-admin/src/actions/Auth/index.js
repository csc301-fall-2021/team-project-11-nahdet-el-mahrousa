import store from "../../store/store";
import { updateAuth } from "../../store/auths/auth-slice";
import {
  authLogin,
  authLogout
} from "../../api/authApi";

function dispatchAuth(userData) {
    store.dispatch(updateAuth(userData));
}

function verifyLogin({ username, password }) {
    // TODO: send request
    // return authLogin({ username, password }, dispatchMessage);
    return username === "admin" && password === "admin"
}

function verifyLogout({ username, password }) {
    // TODO: send request
    return authLogout({ username, password }, dispatchAuth);
}

export {
    verifyLogin,
    verifyLogout
}