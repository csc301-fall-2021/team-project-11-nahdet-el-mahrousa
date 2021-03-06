const origin = process.env.REACT_APP_ORIGIN


function getAuthorization() {
  let authorization;
  if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
    let TOKEN = localStorage.getItem('token');
    authorization = 'Bearer ' + TOKEN;
  }
  return authorization;
}


const parameterizeQueryArray = (key, arr) => {
  arr = arr.map(encodeURIComponent)
  return '?'+key+'[]=' + arr.join('&'+key+'[]=')
}

async function get(route, params = {}) {
  const url = new URL(origin + route)

  // Append query params to url
  Object.keys(params).forEach(
    key => {
      if (typeof params[key] !== "object"){
        url.searchParams.append(key, params[key])
      } else {
        for (let k in params[key]){
          url.searchParams.append(`${key}[]`, params[key][k])
        }
      }
    }
  )

  console.log(url.href)
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

  try {
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
  } catch (error) {
    throw error
  }
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