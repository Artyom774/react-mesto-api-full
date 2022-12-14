require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const signInRouter = require('./routes/signIn');
const signUpRouter = require('./routes/signUp');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3100 } = process.env; // файл .env хранится на сервере
const app = express(); // app работает через фреймворк Express

const allowedCors = [
  'http://localhost:3000',
  'https://84.201.162.71:3000',
  'https://your-mesto.nomoredomains.icu',
  'http://your-mesto.nomoredomains.icu',
  'http://127.0.0.1',
];

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers; // сохраняем источник запроса в переменную origin
  if (allowedCors.includes(origin)) { // проверяем, что источник запроса есть среди разрешённых
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') { // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', { // подключение к базе MongooseDB
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/signin', signInRouter); // авторизация пользователя
app.use('/signup', signUpRouter); // регистрация пользователя
app.use(auth); // проверка токена
app.use('/users', usersRouter); // пути для работы с карточками
app.use('/cards', cardsRouter); // пути для работы с пользователем
app.use('/', (req, res, next) => { next(new NotFoundError('страница не найдена')); }); // введён неизвестный путь
app.use(errorLogger); // логи
app.use(errors()); // обработка ошибок библиотеки celebrate
app.use(errorHandler); // обработка ошибок сервера

app.listen(PORT, () => { // при запуске сервера выводит его порт
  console.log(`Порт сервера: ${PORT}`);
});
