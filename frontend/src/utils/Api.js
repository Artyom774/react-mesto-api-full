class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _processTheResponse(res) {
    if (res.ok) {
      return res.json();
    };
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(token) {   // загрузка изначальных карточек
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      credentials: "include"
    })
    .then(res => {return this._processTheResponse(res)})
  }

  getUserInfo(token) {   // загрузка сведений о пользователе со сервера
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      headers: {
        'authorization': `Bearer ${token}`
      },
      credentials: "include"
    })
    .then(res => {return this._processTheResponse(res)})
  }

  refreshUserInfo(data, token) {   // отправка обновлённых данных о пользователе
    console.log('отправляем с фронта', JSON.stringify({
      name: data.name,
      about: data.job
    }));
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    /*
    headers: this._headers,
    headers: {
      'authorization': `Bearer ${token}`
    },
    */
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      about: data.job
    })})
    .then(res => {return this._processTheResponse(res)})
  }

  postNewCard(data, token) {   // загрузка новой карточки на сервер
    return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })})
    .then(res => {return this._processTheResponse(res)})
  }

  refreshAvatar(data, token) {   // загрузка новой аватарки пользователя
    return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    credentials: "include",
    body: JSON.stringify({
      avatar: data.avatar
    })})
    .then(res => {return this._processTheResponse(res)})
  }

  deleteCard(cardId, token) {  // удалить карточку
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      credentials: "include"
    })
    .then(res => {return this._processTheResponse(res)})
  }

  putLike(cardId, token) {   // поставить лайк
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      credentials: "include"
    })
    .then(res => {return this._processTheResponse(res)})
  }

  deleteLike(cardId, token) {  // убрать лайк
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      credentials: "include"
      })
      .then(res => {return this._processTheResponse(res)})
  }
}

export const api = new Api({
  baseUrl: 'http://84.201.162.71:3100',
  headers: {
    'Content-Type': 'application/json'
  }
});