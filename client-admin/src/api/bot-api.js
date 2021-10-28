export function getSurvey() {
   axios
      .get("https://nm-bot-server.herokuapp.com/admin/bot")
      .then((response) => {
         msg = response.message
      }, (error) => {
         console.log(error);
      });
   return msg
}

export function createMessage() {
   axios({
      method: 'post',
      url: "https://nm-bot-server.herokuapp.com/admin/bot/message",
      data: []
   })
   .then((response) => {
   }, (error) => {
      console.log(error);
   });
}

export function editMessage() {
   axios({
      method: 'put',
      url: "https://nm-bot-server.herokuapp.com/admin/bot/message",
      data: []
   })
   .then((response) => {
   }, (error) => {
      console.log(error);
   });
}
export function deleteMessage() {
   axios({
      method: 'delete',
      url: "https://nm-bot-server.herokuapp.com/admin/bot/message",
      data: []
   })
   .then((response) => {
   }, (error) => {
      console.log(error);
   });
}
export function createReply() {
   axios({
      method: 'post',
      url: "https://nm-bot-server.herokuapp.com/admin/bot/reply",
      data: []
   })
   .then((response) => {
   }, (error) => {
      console.log(error);
   });
}

export function editReply() {
   axios({
      method: 'put',
      url: "https://nm-bot-server.herokuapp.com/admin/bot/reply",
      data: []
   })
   .then((response) => {
   }, (error) => {
      console.log(error);
   });
}
export function deleteReply() {
   axios({
      method: 'delete',
      url: "https://nm-bot-server.herokuapp.com/admin/bot/reply",
      data: []
   })
   .then((response) => {
   }, (error) => {
      console.log(error);
   });
}