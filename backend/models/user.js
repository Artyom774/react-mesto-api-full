const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { URLregex } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'invalidEmail'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [URLregex, 'invalidAvatar'],
  },
});
userSchema.set('versionKey', false); // убирает __v при создании пользователя

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        const newUnauthorizedError = new UnauthorizedError('Неправильные почта или пароль');
        newUnauthorizedError.name = 'emailPasswordError';
        return Promise.reject(newUnauthorizedError);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const newUnauthorizedError = UnauthorizedError('Неправильные почта или пароль');
            newUnauthorizedError.name = 'emailPasswordError';
            return Promise.reject(newUnauthorizedError);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
