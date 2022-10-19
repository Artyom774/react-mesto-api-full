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

  getInitialCards() {   // загрузка изначальных карточек
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
    .then(res => {return this._processTheResponse(res)})
  }

  getUserInfo() {   // загрузка сведений о пользователе со сервера
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
    .then(res => {return this._processTheResponse(res)})
  }

  refreshUserInfo(data) {   // отправка обновлённых данных о пользователе
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.job
    })})
    .then(res => {return this._processTheResponse(res)})
  }

  postNewCard(data) {   // загрузка новой карточки на сервер
    return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })})
    .then(res => {return this._processTheResponse(res)})
  }

  refreshAvatar(data) {   // загрузка новой аватарки пользователя
    return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: data.avatar
    })})
    .then(res => {return this._processTheResponse(res)})
  }

  deleteCard(cardId) {  // удалить карточку
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {return this._processTheResponse(res)})
  }

  putLike(cardId) {   // поставить лайк
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {return this._processTheResponse(res)})
  }

  deleteLike(cardId) {  // убрать лайк
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then(res => {return this._processTheResponse(res)})
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '4ebcb58d-24e4-4099-bba2-cf0ad7de26a8',
    'Content-Type': 'application/json'
  }
});