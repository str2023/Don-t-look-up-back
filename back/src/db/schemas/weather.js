const { Schema, model } = require('mongoose');

const WeatherSchema = new Schema(
  {
    addressName: {
      type: String,
      required: true,
    },
    areaNo: {
      type: Number,
    },
    temperature: {
      // date:관측시간
      time: Number,
      type: Number,
    },
    UVIdx: {
      // h0:관측시점의 지수, h3,h6:3,6시간 후의 예상치
      time: String,
      h0: Number,
      h3: Number,
      h6: Number,
    },
  },
  {
    timestamps: true,
  },
);

const WeatherModel = model('Weather', WeatherSchema);
module.exports = WeatherModel;
