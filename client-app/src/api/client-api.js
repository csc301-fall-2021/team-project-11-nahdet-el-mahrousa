import { httpGet, httpPost } from "util/http"

export function getFirstMessage() {
   return httpGet("/client/bot/message")
      .then((response) => {
         if (response.statusCode === 200) {
            console.log(response)
            return { // mock data (should change to [ return response.entity; ]  later)
               message: { content: "Hello, welcome!" },
               replies: [{ content: "let's go!", toMessage: "tm3" }, { content: "I'll leave", toMessage: "tm2" }]
            };
         }
      }).catch((error) => {
         console.log(error)
         // mock data (delete later)
         return {
            message: { content: "Hello, welcome!" },
            replies: [{ content: "let's go!", toMessage: "tm3" }, { content: "I'll leave", toMessage: "tm2" }]
         };
         // end mock data
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