require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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

const { PORT = 3100 } = process.env; // файла .env нет в проекте
const app = express(); // app работает через фреймворк Express

const corsOptions = { // настройки КОРС-а
  credentials: true,
  origin: [
    'http://localhost:3000',
    'http://84.201.162.71:3000',
    'https://84.201.162.71:3000',
    'http://your-mesto.nomoredomains.icu',
    'https://your-mesto.nomoredomains.icu'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
};
app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/mestodb', { // подключение к базе MongooseDB
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/signin', signInRouter); // авторизация пользователя
app.use('/signup', signUpRouter); // регистрация пользователя
app.use(auth); // проверка токена
app.use('/users', usersRouter); // пути для работы с карточками
app.use('/cards', cardsRouter); // пути для работы с пользователем
app.use('/', (req, res, next) => { next(new NotFoundError('страница не найдена')); }); // введён неизвестный путь
app.use(errorLogger);
app.use(errors()); // обработка ошибок библиотеки celebrate
app.use(errorHandler); // обработка ошибок сервера

app.listen(PORT, () => { // при запуске сервера выводит его порт
  console.log(`Порт сервера: ${PORT}`);
});
