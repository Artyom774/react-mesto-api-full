const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findAllCards, findCardById, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { URLregex, idRegex } = require('../utils/constants');

cardsRouter.get('/', findAllCards);
cardsRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).pattern(idRegex),
  }),
}), findCardById);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URLregex),
  }),
}), createCard);
cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).pattern(idRegex),
  }),
}), deleteCard);
cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).pattern(idRegex),
  }),
}), likeCard);
cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).pattern(idRegex),
  }),
}), dislikeCard);

module.exports = cardsRouter;
