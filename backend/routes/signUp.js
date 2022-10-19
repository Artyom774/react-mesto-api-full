const signUpRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');
const { URLregex } = require('../utils/constants');

signUpRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(8),
    email: Joi.string().required().min(5).email(),
    password: Joi.string().required().min(8),
    about: Joi.string().min(2).max(8),
    avatar: Joi.string().pattern(URLregex),
  }),
}), createUser);

module.exports = signUpRouter;
