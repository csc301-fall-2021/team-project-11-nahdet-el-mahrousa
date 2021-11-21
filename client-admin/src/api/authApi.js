import * as http from "../utils/http";
export function authCreate(data, dispatchAuth) {
  console.log(data);
  let userData = [];
  http
    .post("/auth/create", data)
    .then((response) => {
      if (response.statusCode === 200) {
        userData = data; 
        console.log(response.message);
        dispatchAuth(userData);
      } else {
        console.log(response.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function authLogin(data, dispatchAuth) {
  console.log(data);
  http
    .post("/auth/login", data)
    .then((response) => {
      if (response.statusCode === 200) {
        console.log(response);
        if (response == null){
          //failed to login
        } else {
          //add jwt token to userData
        }
      } else {
        console.log(response.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function authLogout(data, dispatchAuth) {
    console.log(data);
    let userData = [];
    http
      .post("/user/delete", data)
      .then((response) => {
        if (response.statusCode === 200) {
          console.log(response.message);
          dispatchAuth(userData);
        } else {
          console.log(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
}
