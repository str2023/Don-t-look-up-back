const { Schema, model } = require('mongoose');

const ClothesSchema = new Schema({
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
  shoe: {
    type: String,
  },
});

const ClothesModel = model('Clothes', ClothesSchema);
const ItemsModel = model('Items', ItemSchema);
module.exports = { ClothesModel, ItemsModel };
