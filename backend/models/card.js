const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const { Schema } = mongoose;
const { Types } = Schema;
const { ObjectId } = Types;

const modelCardConfig = require('../configs/modelCard');
const CardLike = require('./cardLike');

const { name, link } = modelCardConfig;

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: name.minLength,
      maxLength: name.maxLength,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      minLength: link.minLength,
      maxLength: link.maxLength,
      validate: isURL,
      trim: true,
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

cardSchema.statics.config = modelCardConfig;

cardSchema.pre('deleteOne', { document: true }, async function deleteCardLikes(next) {
  try {
    await CardLike.remove({ card: this._id }).exec();
  } catch (err) {
    return next(err);
  }
  return next();
});

module.exports = mongoose.model('card', cardSchema);
