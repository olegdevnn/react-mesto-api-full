const User = require('../models/user');

const lookupUser = {
  $lookup:
    {
      from: User.collection.collectionName,
      let: { owner: '$owner' },
      pipeline: [
        {
          $match:
            {
              $expr: {
                $eq: ['$_id', '$$owner'],
              },
            },
        },
        {
          $project: {
            password: 0,
          },

        },
      ],
      as: 'owner',
    },
};

module.exports = lookupUser;
