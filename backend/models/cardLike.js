const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types } = Schema;
const { ObjectId } = Types;

const cardLikeSchema = new Schema(
  {
    card: {
      type: ObjectId,
      ref: 'card',
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

cardLikeSchema.index({ card: 1, owner: 1 }, { unique: true });

module.exports = mongoose.model('cardLike', cardLikeSchema);
