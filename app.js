/* eslint-disable no-console */ // ? разрешаем писать console во всем файле
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
// * свои
const { NotFound } = require('./utils/NotFound');
// ? роутеры
const routerAuth = require('./routes/auth');
const router = require('./routes/main');

// ? middlewares
const { handleErrors } = require('./middlewares/HandleErrors');
const { limiter } = require('./middlewares/Limiter');
const auth = require('./middlewares/Auth');
const { Logger } = require('./middlewares/Logger');

const { DEFAULT_VALUES } = require('./utils/constants');

// ? объявление порт`а
const { PORT = 3001, ADDRESS_DB = 'mongodb://localhost:27017/mesto' } = process.env;

const app = express();

// * CORS
app.use(); // DEFAULT_VALUES.CORS_OPTIONS

// * protection
app.use(helmet());

app.use(cookieParser());
app.use(express.json());

// * requests logger
app.use(Logger.request);

app.use(limiter.simpleRequest);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server going crash');
  }, 0);
});

// * routes
app.use(routerAuth);
app.use(auth, router);
app.use('*', NotFound);

// ? errors logger
app.use(Logger.error);

// ? валидация ошибок
app.use(errors());
app.use(handleErrors);

try {
  // ? подключаемся к серверу mongo
  mongoose.connect(ADDRESS_DB, () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Connected to port: [${PORT}]`);
    });
  });
} catch (error) {
  console.log(error);
}
