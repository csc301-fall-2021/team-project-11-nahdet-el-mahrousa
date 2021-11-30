import { backToLogin } from "actions/Auth";
import { message } from "antd";
import * as http from "../utils/http";
const origin = process.env.REACT_APP_ORIGIN

export function getBot(dispatchMessage) {
  let msg = [];
  http.get("/admin/bot")
    .then((response) => {
      if (response.statusCode === 200) {
        msg = response.entity;
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

export function getQueryBot(query, dispatchMessage) {
  let msg = [];
  let body = {[query.key]: query.value};
  http.get("/admin/bot", body)
    .then((response) => {
      if (response.statusCode === 200) {
        msg = response.entity;
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

// export function deleteReply() {
//    axios({
//       method: 'delete',
//       url: "https://nm-bot-server.herokuapp.com/admin/bot/reply",
//       data: []
//    })
//    .then((response) => {
//    }, (error) => {
//       console.error(error);
//    });
// }
