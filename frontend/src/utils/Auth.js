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
      console.log(
        `Запрос на сервер [${this._adress}] с целью [${message}] обработан удачно`
      );
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  //? регистрация или авторизация
  _sign(email, password, url, message) {
    return (
      fetch(`${this._adress}/${url}`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      })
        //? проверяем
        .then((res) => {
          return this._checkResponse(res, message);
        })
    );
  }

  //? регистрация
  registration(email, password) {
    return this._sign(email, password, "signup", "регистрации");
  }

  //? авторизация
  authorization(email, password) {
    return (
      fetch(`${this._adress}/signin`, {
        method: "POST",
        // ! сделать проверку на signin и signup
        credentials: "include",
        headers: this._headers,
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      })
        //? проверяем
        .then((res) => {
          return this._checkResponse(res, "авторизации");
        })
    );
  }

  //? проверка токена
  validationJWT(message) {
    return (
      fetch(`${this._adress}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: this._headers,
      })
        //? проверяем
        .then((res) => {
          return this._checkResponse(res, message);
        })
    );
  }

  logOut() {
    return (
      fetch(`${this._adress}/signout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        //? проверяем
        .then((res) => {
          return this._checkResponse(res, "выйти из сети");
        })
    );
  }
}

export const auth = new Auth({
  baseUrl: baseUrl,
  headers: {
    origin: baseUrl,
    "Content-Type": "application/json",
  },
});
