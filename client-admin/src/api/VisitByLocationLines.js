import * as http from "utils/http"

export async function getFirstMessage() {
   try {
      const response = await httpGet("/statistics/visit");
      if (response.statusCode === 200) {
         console.log(response);
         if (!response.entity) {
            throw new Error("No Entity")
         }
         return response.entity;
      } else {
         throw new Error(response.msg);
      }
   } catch (error) {
      console.log("API", error);
      throw new Error(error);
   }
}

export async function getNextMessage(data) {
   try {
      const response = await httpPost("/bot/message", data);
      if (response.statusCode === 200) {
         console.log(response);
         if (!response.entity) {
            throw new Error("No Entity")
         }
         return response.entity;
      } else {
         throw new Error(response.msg);
      }
   } catch (error) {
      console.log("API", error);
      throw new Error(error);
   }
}