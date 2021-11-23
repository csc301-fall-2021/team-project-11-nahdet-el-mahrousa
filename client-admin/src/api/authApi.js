import * as http from "../utils/http";
export function authLogin(data, loginAuthUser) {
  console.log(data);
  let token = [];
  http.post("/auth/login", data)
    .then((response) => {
      if (response.statusCode === 200) {
        token = response.entity.accessToken;
        console.log(response.entity.accessToken);
        loginAuthUser(token);
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}