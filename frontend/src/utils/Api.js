
import { baseUrl, consoleMessage } from "./Constants";

class Api {
  constructor(setting) {
    this._adress = setting.baseUrl;
    this._headers = setting.headers;
  }

  _checkResponse(res, message = '') {
    // тут проверка ответа
    if (res.ok) {
      console.log(`Запрос на сервер [${this._adress}]${message ? ' с целью [' + message + ']' : ''} обработан успешно`);
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(url, options, message) {
    return fetch(url, options)
      .then((res) => { return this._checkResponse(res, message) })
  }

  //? запрос чтобы получить данные о пользователе
  getUserInfo() {
    return this._request(`${this._adress}/users/me`, {
      method: "GET",
      headers: this._headers,
    },
      consoleMessage.GET + ' data of user'
    )
  }

  //? запрос чтобы изменить данные о пользователе
  //* (имя и описание)
  setUserInfo(user) {
    return this._request(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    },
      consoleMessage.PATCH + ' data of user'
    )
  }

  //? запрос чтобы изменить аватар пользователя
  setUserAvatar(avatar) {
    return this._request(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: avatar
      })
    },
      consoleMessage.PATCH + ' avatar user',
    )
  }

  //? запрос чтобы получить массив карточек
  getCardArray() {
    return this._request(`${this._adress}/cards`, {
      method: "GET",
      headers: this._headers,
    },
      consoleMessage.GET + ' array cards',
    )
  }

  //? запрос чтобы добавить карточку
  addNewCard(card) {
    return this._request(`${this._adress}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    },
      consoleMessage.POST + ' card',
    )
  }

  //? запрос чтобы удалить карточку
  deleteCard(card) {
    return this._request(`${this._adress}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    },
      consoleMessage.DELETE + ' card',
    )
  }

  //? запрос чтобы добавить/удалить лайк с карточки
  changeLike(card, userId) {
    let action = "PUT";
    card.likes.forEach((like) => {
      if ((like._id === userId) && (action === "PUT")) {
        action = "DELETE";
      }
    })

    return this._request(`${this._adress}/cards/${card._id}/likes`, {
      method: action,
      headers: this._headers,
    },
      consoleMessage[`${action}`] + ' like'
    )
  }
}

//? создаем экземпляр класса
export const api = new Api({
  baseUrl: baseUrl,
  headers: {
    "origin": baseUrl,
    "Content-Type": "application/json",
  },
});
