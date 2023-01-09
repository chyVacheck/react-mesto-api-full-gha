
import { baseUrl } from "./Constants";

class Auth {
  constructor(setting) {
    this._adress = setting.baseUrl;
    this._headers = setting.headers;
  }

  //? аналочичен методу в api
  _checkResponse(res, message) {
    //? тут проверка ответа
    if (res.ok) {
      console.log(`Запрос на сервер [${this._adress}] с целью [${message}] обработан удачно`);
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //? регистрация или авторизация
  _sign(email, password, url, message) {
    return fetch(`${this._adress}/${url}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      }),
    })
      //? проверяем
      .then((res) => {
        return this._checkResponse(res, message);
      })
  }

  //? регистрация
  registration(email, password) {
    return this._sign(email, password, "signup", "регистрации")
  }

  //? авторизация
  authorization(email, password) {
    return this._sign(email, password, "signin", "авторизации")
  }

  //? проверка токена
  validationJWT(token, message) {
    return fetch(`${this._adress}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      //? проверяем
      .then((res) => {
        return this._checkResponse(res, message);
      })
  }
}

export const auth = new Auth({
  baseUrl: baseUrl,
  headers: {
    "origin": baseUrl,
    'Content-Type': 'application/json',
  },
});
