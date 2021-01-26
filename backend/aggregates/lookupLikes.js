const CardLike = require('../models/cardLike');

const lookupLikes = {
  $lookup: {
    from: CardLike.collection.collectionName,
    localField: '_id',
    foreignField: 'card',
    as: 'likes',
  },
};

module.exports = lookupLikes;
