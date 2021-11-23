const origin = process.env.REACT_APP_ORIGIN


function getAuthorization() {
  let authorization = undefined;
  if (localStorage.getItem('token') && localStorage.getItem('token') !== ''){
    let TOKEN = localStorage.getItem('token');
    authorization = 'Bearer' + ' ' + TOKEN;
    console.log(authorization)
  }
  return authorization;
}

async function get(route, params = {}) {
  const url = new URL(origin + route)

  // Append query params to url
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Authorization': getAuthorization(),
      'Content-Type': 'application/json'
    },
  })

  return await response.json()
}

async function post(route, data = {}) {
  const url = origin + route

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Authorization': getAuthorization(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return await response.json()
}

async function put(route, data = {}) {
  const url = origin + route

  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Authorization': getAuthorization(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return await response.json()
}

async function del(route, data = {}) {
  const url = origin + route

  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Authorization': getAuthorization(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return await response.json()
}

export { get, post, put, del };