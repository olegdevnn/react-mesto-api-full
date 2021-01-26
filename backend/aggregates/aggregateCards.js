const { MAX_CARDS } = require('../configs');
const lookupLikes = require('./lookupLikes');
const lookupUser = require('./lookupUser');

const aggregateCards = [
  lookupLikes,
  lookupUser,
  { $unwind: '$owner' },
  { $sort: { createdAt: -1 } },
  { $limit: MAX_CARDS },
];

module.exports = aggregateCards;
