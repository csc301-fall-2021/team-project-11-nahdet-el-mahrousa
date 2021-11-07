import { httpGet, httpPost } from "util/http";

export async function getFirstMessage() {
   try {
      const response = await httpGet("/bot/message");
      if (response.statusCode === 200) {
         console.log(response);
         return response.entity;
      } else {
         throw new Error (response.msg);
      }
   } catch(error) {
      console.log(error);
   }
}

export async function getNextMessage(data) {
   try {
      const response = await httpPost("/bot/message", data);
      if (response.statusCode === 200) {
         console.log(response);
         return response.entity;
      } else {
         throw new Error (response.msg);
      }
   } catch(error) {
      console.log(error);
   }
}