import * as http from "../utils/http";

export function getBot(dispatchMessage) {
  let msg = [];
  http.get("/admin/bot")
    .then((response) => {
      if (response.statusCode === 200) {
        msg = response.entity;
        console.log(response.entity);
        dispatchMessage(msg);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getQueryBot(query, dispatchMessage) {
  let msg = [];
  console.log(query);
  http.get("/admin/bot")
    .then((response) => {
      if (response.statusCode === 200) {
        msg = response.entity;
        console.log(response.entity);
        dispatchMessage(msg);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createMessage(data, dispatchMessage) {
  console.log(data);
  http.post("/admin/bot/message", data)
    .then((response) => {
      if (response.statusCode === 200) {
        console.log(response.msg);
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function deleteMessage(data, dispatchMessage) {
  console.log(data);
  http.del("/admin/bot/message", data)
    .then((response) => {
      if (response.statusCode === 200) {
        console.log(response.msg);
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function editMessage(data, dispatchMessage) {
  console.log(data);
  http.put("/admin/bot/message", data)
    .then((response) => {
      if (response.statusCode === 200) {
        console.log(response.msg);
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
export function deleteReply(data, dispatchMessage) {
  let msg = [];
  console.log(data);
  http.del("/admin/bot/reply", data)
    .then((response) => {
      if (response.statusCode === 200) {
        console.log(response.msg);
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createReply(data, dispatchMessage) {
  let msg = [];
  console.log(data);
  http.post("/admin/bot/reply", data)
    .then((response) => {
      if (response.statusCode === 200) {
        console.log(response.msg);
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function editReply(data, dispatchMessage) {
  let msg = [];
  console.log(data);
  http.put("/admin/bot/reply", data)
    .then((response) => {
      if (response.statusCode === 200) {
        console.log(response.msg);
        getBot(dispatchMessage);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
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
//       console.log(error);
//    });
// }
