import * as http from "../utils/http";
export function authLogin(data, dispatchAuth) {
  console.log(data);
  http
    .post("", data)
    .then((response) => {
      if (response.statusCode === 200) {
        console.log(response.msg);
      } else {
        console.log(response.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function authLogout(data, dispatchAuth) {
    console.log(data);
    http
      .post("", data)
      .then((response) => {
        if (response.statusCode === 200) {
          console.log(response.msg);
        } else {
          console.log(response.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
}
