const origin = process.env.REACT_APP_ORIGIN;

export async function httpGet(route) {
  const url = origin + route;
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
  });
  return response.json();
}

export async function httpPost(route, data = {}) {
  console.log(JSON.stringify(data));
  const url = origin + route;
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json();
}