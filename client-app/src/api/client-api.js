import { httpGet, httpPost } from "util/http";

// Get an initial welcome message. This request should be made when 
// the user enters the app, so that the options are fetched and the 
// bot can continue working.
// Return a welcome Message and its reply options.
export async function getFirstMessage() {
   try {
      // Get data from /bot/message
      const response = await httpGet("/bot/message");
      // Response get successfully
      if (response.statusCode === 200) {
         console.log(response);
         if (!response.entity) {
            throw new Error("No Entity")
         }
         return response.entity;
      } else { // Fail to get response, throw error
         throw new Error(response.msg);
      }
   } catch (error) { // API error occurs
      console.error("API", error);
      throw new Error(error);
   }
}

// Get the next message when the user chooses a reply.
// Return the corresponding next Message and its reply options.
export async function getNextMessage(data) {
   try {
      // Post data from /bot/message
      const response = await httpPost("/bot/message", data);
      // Response get successfully
      if (response.statusCode === 200) {
         console.log(response);
         if (!response.entity) {
            throw new Error("No Entity")
         }
         return response.entity;
      } else { // Fail to get response, throw error
         throw new Error(response.msg);
      }
   } catch (error) { // API error occurs
      console.error("API", error);
      throw new Error(error);
   }
}