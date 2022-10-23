export const BASE_URL = 'http://api.your-mesto.nomoredomains.icu';

function _checkResponse(res) {
    if (res.ok) {
      return res.json();
    };
    return Promise.reject(`Ошибка: ${res.status}`);
  }

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(res => { return _checkResponse(res)})
  .then((res) => {
    return res;
  })
};

export const authorization = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(res => { return _checkResponse(res)})
  .then((res) => {
    localStorage.setItem('token', res.token);
    return res;
  })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    credentials: "include"
  })
  .then(res => { return _checkResponse(res)})
  .then(data => data)
} 