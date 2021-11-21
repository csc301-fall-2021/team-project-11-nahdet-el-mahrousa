import store from "../../store/store";
import { updateAuth } from "../../store/auths/auth-slice";
import {
  authLogin,
  authCreate,
  authLogout
} from "../../api/authApi";

function dispatchAuth(userData) {
    store.dispatch(updateAuth(userData));
}

function createUser({ username, password }) {
    return authCreate({ username, password }, dispatchAuth);
}

function verifyLogin({ username, password }) {
    // return authLogin({ username, password }, dispatchAuth);
    return username === "admin" && password === "admin"
}

function verifyLogout({ username, password }) {
    return authLogout({ username, password }, dispatchAuth);
}

export {
    verifyLogin,
    createUser,
    verifyLogout
}