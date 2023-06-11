const { Schema, model } = require('mongoose');

const MethodSchema = new Schema({
  temp: {
    type: Number,
  },
  extremeWeather: {
    type: String,
  },
  category: {
    type: String,
  },
  typeFor: {
    type: String,
  },
  description: {
    type: String,
  },
});

const MethodModel = model('Method', MethodSchema);
module.exports = MethodModel;
