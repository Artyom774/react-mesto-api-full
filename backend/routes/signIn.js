const signInRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');

signInRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(5).email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = signInRouter;
