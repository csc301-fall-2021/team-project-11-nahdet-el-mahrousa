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
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * get all message and reply data with query
 * @param {*} query to query the messages
 * @param {*} dispatchMessage to dispatch data to store
 */
export function getQueryBot(query, dispatchMessage) {
  let msg = [];
  const url = new URL(origin + "/admin/bot")
  let body = {[query.key]: query.value};
  console.log(body);
  http.get("/admin/bot", body)
    .then((response) => {
      if (response.statusCode === 200) {
        msg = response.entity;
        // dispatch msg to store
        dispatchMessage(msg);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * sent create message request to backend
 * @param {*} data the message data
 * @param {*} dispatchMessage to dispatch data to store
 */
export function createMessage(data, dispatchMessage) {
  console.log(data);
  http.post("/admin/bot/message", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * delete message request to backend
 * @param {*} data the message data needed to delete
 * @param {*} dispatchMessage to dispatch data to store
 */
export function deleteMessage(data, dispatchMessage) {
  console.log(data);
  http.del("/admin/bot/message", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * sent edit message request to backend
 * @param {*} data the message data needed to change message
 * @param {*} dispatchMessage to dispatch data to store
 */
export function editMessage(data, dispatchMessage) {
  console.log(data);
  http.put("/admin/bot/message", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * send delete reply request to backend
 * @param {*} data the reply data needed to delete reply
 * @param {*} dispatchMessage to dispatch data to store
 */
export function deleteReply(data, dispatchMessage) {
  let msg = [];
  console.log(data);
  http.del("/admin/bot/reply", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * send sent create reply request to backend
 * @param {*} data the reply data
 * @param {*} dispatchMessage to dispatch data to store
 */
export function createReply(data, dispatchMessage) {
  let msg = [];
  console.log(data);
  http.post("/admin/bot/reply", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * send edit reply request to backend
 * @param {*} data the reply data needed to change the previous reply datas
 * @param {*} dispatchMessage to dispatch data to store
 */
export function editReply(data, dispatchMessage) {
  let msg = [];
  console.log(data);
  http.put("/admin/bot/reply", data)
    .then((response) => {
      if (response.statusCode === 200) {
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
