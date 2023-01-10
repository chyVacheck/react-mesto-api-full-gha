const validator = require('validator');

// ? для ответов на запросы
const MESSAGE = {
  ERROR: {
    BAD_REQUEST: 'BAD REQUEST',
    FORBIDDEN: 'You are not allowed to do this operation',
    NOT_FOUND: 'NOT FOUND',
    NOT_AUTHORIZED: 'User is not authorized',
    SERVER: 'SERVER ERROR',
    EMAIL: 'Email is incorrect',
    URL: 'URL validation error',
    EMAIL_OR_PASS: 'Wrong email or password',
  },
  INFO: {
    CREATED: 'CREATED',
    DELETE: 'DELETED',
    PUT: 'PUTED',
    PATCH: 'PATCHED',
    LOGOUT: 'YOU LOGOUT',
  },
};
const STATUS = {
  ERROR: {
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER: 500,
  },
  INFO: {
    OK: 200,
    CREATED: 201,
  },
};

// ? для лимитов запросов
const Limits = {
  time: {
    forCreateNewAccount: 60 * 60 * 1000, // 1 час
    forRequest: 15 * 60 * 1000, // 15 минут
  },
  maxNumber: {
    forCreateNewAccount: 10,
    forRequest: 100,
  },
  message: {
    forCreateNewAccount: 'Too many accounts created from this IP, please try again after one hour',
  },
};

// ? для логгов
const logFileNames = {
  forError: 'errors',
  forLog: 'request',
};

const DEFAULT_VALUES = {
  USER: {
    NAME: 'Жак-Ив Кусто',
    ABOUT: 'Исследователь',
    AVATAR: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  ALLOWED_METHODS: 'GET,HEAD,POST,PATCH,DELETE',
  CORS_OPTIONS: {
    origin: [
      // 'http://localhost:3000',
      'http://chyVacheck.mesto.students.nomoredomains.club',
      'https://chyVacheck.mesto.students.nomoredomains.club',
      'http://chyvacheck.mesto.students.nomoredomains.club',
      'https://chyvacheck.mesto.students.nomoredomains.club',
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  },
};

const VALID_VALUES = {
  ID_LENGTH: 24,
  TEXT: {
    LENGTH: {
      MIN: 2,
      MAX: 30,
    },
  },
  PASSWORD: {
    LENGTH: {
      MIN: 4,
      MAX: 50,
    },
  },
  EMAIL: {
    LENGTH: {
      MIN: 5,
    },
  },
};

const isThisURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error(MESSAGE.ERROR.URL);
};

// * экспорт всех констант
module.exports = {
  MESSAGE,
  STATUS,
  Limits,
  isThisURL,
  logFileNames,
  DEFAULT_VALUES,
  VALID_VALUES,
};
