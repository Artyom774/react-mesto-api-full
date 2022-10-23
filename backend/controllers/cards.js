const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

module.exports.findAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards).setHeader('Access-Control-Allow-Headers'))
    .catch((err) => next(err));
};

module.exports.findCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new NotFoundError(`Карточка c id '${req.params.id}' не найдена`))
    .then((card) => {
      if (card) { res.send(card).setHeader('Access-Control-Allow-Headers'); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`'${req.params.id}' не является корректным идентификатором`));
      } else {
        next(err);
      }
    });
};

module.exports.createCard = (req, res, next) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.send(card).setHeader('Access-Control-Allow-Headers'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные о новой карточке не удовлетворяют требованиям валидации'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const ownerId = req.user._id;

  Card.findById(req.params.id)
    .orFail(new NotFoundError(`Карточка c id '${req.params.id}' не найдена`))
    .then((card) => {
      if (card) {
        if (card.owner.toString() === ownerId) {
          card.delete()
            .then(() => res.status(200).json({ message: `Карточка c id '${req.params.id}' успешно удалена` }).setHeader('Access-Control-Allow-Headers'))
            .catch((err) => next(err));
        } else { throw new ForbiddenError('Эта карточка принадлежит другому пользователю'); }
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

module.exports.likeCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(new NotFoundError(`Карточка c id '${req.params.id}' не найдена`))
    .then((card) => {
      if (card) { res.send(card).setHeader('Access-Control-Allow-Headers'); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`'${req.params.id}' не является корректным идентификатором`));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(new NotFoundError(`Карточка c id '${req.params.id}' не найдена`))
    .then((card) => {
      if (card) { res.send(card).setHeader('Access-Control-Allow-Headers'); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`'${req.params.id}' не является корректным идентификатором`));
      } else {
        next(err);
      }
    });
};
