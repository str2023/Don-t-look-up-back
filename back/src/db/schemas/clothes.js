const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
  weather: {
    type: String,
  },
  item: {
    type: String,
  },
});

const ClothesSchema = new Schema({
  temp: {
    type: Number,
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
