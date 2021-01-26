const aggregateCard = require('../aggregates/aggregateCard');
const aggregateCards = require('../aggregates/aggregateCards');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundErrorCard = require('../errors/not-found-err-card');
const Card = require('../models/card');
const CardLike = require('../models/cardLike');
const { CREATED_SUCCESS } = require('../units/httpCodes');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.aggregate(aggregateCards);

    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const { user } = req;

    const { _id } = await Card.create({
      name,
      link,
      owner: user._id,
    });

    const card = await Card.aggregate(aggregateCard(_id));

    return res.status(CREATED_SUCCESS).send(card[0]);
  } catch (err) {
    return next(err);
  }
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { user } = req;

  return Card.findById(cardId)
    .orFail(() => new NotFoundErrorCard())
    .then((card) => {
      if (card.owner.toString() !== user._id) {
        return next(new ForbiddenError());
      }

      return card;
    })
    .then((card) => card.deleteOne())
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

const addLikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const { user } = req;

    await Card.findById(cardId)
      .orFail(() => new NotFoundErrorCard());

    await CardLike.findOneAndUpdate({
      card: cardId,
      owner: user._id,
    },
    {
      card: cardId,
      owner: user._id,
    }, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    const card = await Card.aggregate(aggregateCard(cardId));

    return res.send(card[0]);
  } catch (err) {
    return next(err);
  }
};

const deleteLikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const { user } = req;

    await Card.findById(cardId)
      .orFail(() => new NotFoundErrorCard());

    await CardLike.findOneAndRemove({
      card: cardId,
      owner: user._id,
    });

    const card = await Card.aggregate(aggregateCard(cardId));

    return res.send(card[0]);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getCards, createCard, deleteCard, addLikeCard, deleteLikeCard,
};
