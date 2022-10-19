const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findAllUsers, getMeById, findUserById, updateUser, updateAvatar,
} = require('../controllers/users');
const { URLregex, idRegex } = require('../utils/constants');

usersRouter.get('/', findAllUsers);
usersRouter.get('/me', getMeById);
usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).pattern(idRegex),
  }),
}), findUserById);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URLregex),
  }),
}), updateAvatar);

module.exports = usersRouter;
