const { Schema, model } = require('mongoose');

const OutfitSchema = new Schema({
  userId: {
    // 커스텀 옷차림
    type: String,
  },
  weatherCondition: {
    type: String,
  },
  temp: {
    type: Number,
  },
  item: {
    type: String,
  },
  top: {
    type: String,
  },
  bottom: {
    type: String,
  },
  outer: {
    type: String,
  },
  shoes: {
    type: String,
  },
});

const OutfitModel = model('Outfit', OutfitSchema);
module.exports = OutfitModel;
