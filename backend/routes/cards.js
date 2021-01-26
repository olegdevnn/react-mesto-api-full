const { celebrate, Segments } = require('celebrate');
const express = require('express');

const {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
} = require('../controllers/cards');
const cardIdSchema = require('../validates/cardId');
const createCardSchema = require('../validates/createCard');

const router = express.Router();

router.get('/', getCards);

router.post('/', celebrate({
  [Segments.BODY]: createCardSchema,
}), createCard);

router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: cardIdSchema,
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: cardIdSchema,
}), addLikeCard);

router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: cardIdSchema,
}), deleteLikeCard);

module.exports = router;
