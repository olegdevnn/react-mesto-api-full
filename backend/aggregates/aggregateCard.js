const mongoose = require('mongoose');

const { MAX_CARDS } = require('../configs');
const lookupLikes = require('./lookupLikes');
const lookupUser = require('./lookupUser');

const { ObjectId } = mongoose.Types;

const aggregateCard = (cardId) => [
  {
    $match: {
      _id: ObjectId(cardId),
    },
  },
  lookupLikes,
  lookupUser,
  { $unwind: '$owner' },
  { $sort: { createdAt: -1 } },
  { $limit: MAX_CARDS },
  { $limit: 1 },
];

module.exports = aggregateCard;
