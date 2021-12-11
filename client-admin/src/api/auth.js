import * as http from "../utils/http";

/**
 * Call server to login a user, ask for jwt token.
 * @param {*} data login data
 * @returns token, or null if invalid credentials
 */
export async function authLogin(data) {
  // console.log(data);
  try {
    const response = await http.post("/auth/login", data)
    return response
  } catch (err) {
    console.error(err)
    throw new Error("An API error has occurred")
  }
}