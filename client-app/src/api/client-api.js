import { httpGet, httpPost } from "util/http"

export function getFirstMessage() {
   httpGet("/client/bot/message")
      .then((response) => {
         if (response.statusCode === 200) {
            console.log(response)
            return response.entity;
         }
      }).catch((error) => {
         console.log(error)
      });
}

export function getNextMessage(data) {
   console.log(data)
   httpPost("/client/bot/message", data)
      .then((response) => {
         if (response.statusCode === 200) {
            console.log(response)
            return response.entity;
         }
      }).catch((error) => {
         console.log(error)
      });
}