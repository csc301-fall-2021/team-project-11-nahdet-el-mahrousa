import { backToLogin } from "actions/Auth";
import { message } from "antd";
import * as http from "../utils/http";
const origin = process.env.REACT_APP_ORIGIN

/**
 * get all message and reply data
 * @param {*} dispatchMessage to dispatch data to store
 */
export function getBot(dispatchMessage) {
  let msg = [];
  http.get("/admin/bot")
    .then((response) => {
      if (response.statusCode === 200) {
        msg = response.entity;
        // dispatch msg to store
        dispatchMessage(msg);
      } else if (response.statusCode === 401){
        backToLogin()
      } else {
        message.warning(response.msg)
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * get all message and reply data with query
 * @param {*} query to query the messages
 * @param {*} dispatchMessage to dispatch data to store
 */
export function getQueryBot(query, dispatchMessage) {
  let msg = [];
  let body = {[query.key]: query.value};
  http.get("/admin/bot", body)
    .then((response) => {
      if (response.statusCode === 200) {
        msg = response.entity;
        // dispatch msg to store
        dispatchMessage(msg);
      } else if (response.statusCode === 401){
        backToLogin()
      } else {
        message.warning(response.msg);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * sent create message request to backend
 * @param {*} data the message data
 * @param {*} dispatchMessage to dispatch data to store
 */
export function createMessage(data, dispatchMessage) {
  http.post("/admin/bot/message", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else if (response.statusCode === 401){
        backToLogin()
      } else {
        message.warning(response.msg);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * delete message request to backend
 * @param {*} data the message data needed to delete
 * @param {*} dispatchMessage to dispatch data to store
 */
export function deleteMessage(data, dispatchMessage) {
  http.del("/admin/bot/message", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else if (response.statusCode === 401){
        backToLogin()
      } else {
        message.warning(response.msg);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * sent edit message request to backend
 * @param {*} data the message data needed to change message
 * @param {*} dispatchMessage to dispatch data to store
 */
export function editMessage(data, dispatchMessage) {
  http.put("/admin/bot/message", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else if (response.statusCode === 401){
        backToLogin()
      } else {
        message.warning(response.msg);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * send delete reply request to backend
 * @param {*} data the reply data needed to delete reply
 * @param {*} dispatchMessage to dispatch data to store
 */
export function deleteReply(data, dispatchMessage) {
  http.del("/admin/bot/reply", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else if (response.statusCode === 401){
        backToLogin()
      } else {
        message.warning(response.msg);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * send sent create reply request to backend
 * @param {*} data the reply data
 * @param {*} dispatchMessage to dispatch data to store
 */
export function createReply(data, dispatchMessage) {
  http.post("/admin/bot/reply", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else if (response.statusCode === 401){
        backToLogin()
      } else {
        message.warning(response.msg);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * send edit reply request to backend
 * @param {*} data the reply data needed to change the previous reply datas
 * @param {*} dispatchMessage to dispatch data to store
 */
export function editReply(data, dispatchMessage) {
  http.put("/admin/bot/reply", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else if (response.statusCode === 401){
        backToLogin()
      } else {
        message.warning(response.msg);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
