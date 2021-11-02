import {getItems, postItems, deleteItems, putItems} from "../util/http"

export function getBot(dispatchMessage) {
      let msg = [];
      getItems("/admin/bot")
      .then((response) => {
         if(response.statusCode === 200){
            msg = response.entity;
            console.log(response.entity);
            dispatchMessage(msg);
         } else {
            console.log(response.msg);
         }
      }) .catch((error) => {console.log(error)});
}

// export function createMessage(content, label, dispatchReplaceMessages) {
//    axios({
//       method: 'post',
//       url: "https://nm-bot-server.herokuapp.com/admin/bot/message",
//       data: []
//    })
//    .then((response) => {
//    }, (error) => {
//       console.log(error);
//    });
// }

// export function editMessage() {
//    axios({
//       method: 'put',
//       url: "https://nm-bot-server.herokuapp.com/admin/bot/message",
//       data: []
//    })
//    .then((response) => {
//    }, (error) => {
//       console.log(error);
//    });
// }
export function deleteReply(data, dispatchMessage) {
   let msg = [];
   console.log(data)
   deleteItems("/admin/bot/reply", data)
   .then((response) => {
      if(response.statusCode === 200){

         console.log(response.msg);
         getBot(dispatchMessage)
      } else {
         console.log(response.msg);
      }
   }) .catch((error) => {console.log(error)});
}

export function createReply(data, dispatchMessage) {
   let msg = [];
   console.log(data)
   postItems("/admin/bot/reply", data)
   .then((response) => {
      if(response.statusCode === 200){

         console.log(response.msg);
         getBot(dispatchMessage)
      } else {
         console.log(response.msg);
      }
   }) .catch((error) => {console.log(error)});
}

export function editReply(data, dispatchMessage) {
   let msg = [];
   console.log(data)
   putItems("/admin/bot/reply", data)
   .then((response) => {
      if(response.statusCode === 200){

         console.log(response.msg);
         getBot(dispatchMessage)
      } else {
         console.log(response.msg);
      }
   }) .catch((error) => {console.log(error)});
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