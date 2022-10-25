const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const DuplicateError = require('../errors/DuplicateError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.findAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      const allUsers = users.map((user) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
        avatar: user.avatar,
      }));
      res.send(allUsers);
    })
    .catch((err) => next(err));
};

module.exports.getMeById = (req, res, next) => {
  User.findById(req.user)
    .orFail(new NotFoundError(`Пользователь c id '${req.params.id}' не найден`))
    .then((user) => {
      if (user) {
        res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          about: user.about,
          avatar: user.avatar,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`'${req.params.id}' не является корректным идентификатором`));
      } else {
        next(err);
      }
    });
};

module.exports.findUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError(`Пользователь c id '${req.params.id}' не найден`))
    .then((user) => {
      if (user) {
        res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          about: user.about,
          avatar: user.avatar,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`'${req.params.id}' не является корректным идентификатором`));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash, // записываем хеш в базу
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные о новом пользователе не удовлетворяют требованиям валидации'));
      } else
      if (err.code === 11000) {
        next(new DuplicateError('Пользователь с таким email уже есть'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // const token = jwt.sign({ _id: user._id }, 'super-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const meId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(meId, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError(`Пользователь c id '${req.params.id}' не найден`))
    .then((user) => {
      if (user) {
        res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          about: user.about,
          avatar: user.avatar,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Новые данные не удовлетворяют требованиям валидации'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const meId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(meId, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError(`Пользователь c id '${req.params.id}' не найден`))
    .then((user) => {
      if (user) {
        res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          about: user.about,
          avatar: user.avatar,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Новые данные не удовлетворяют требованиям валидации'));
      } else {
        next(err);
      }
    });
};
