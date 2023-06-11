const { Schema, model } = require('mongoose');

const ActivitySchema = new Schema({
  temp: {
    type: [Number],
    required: true,
  },
  wx: {
    type: String,
    required: true,
  },
  activity: [
    {
      _id: false,
      name: {
        type: String,
        required: true,
      },
      location: [
        {
          _id: false,
          addressName: String, // 시 단위, 추후 동단위까지 확장
          count: {
            type: Number,
            default: 1,
          },
          user: [{ _id: false, userId: String }],
        },
      ],
    },
  ],
});

const ActivityModel = model('Activity', ActivitySchema);
module.exports = ActivityModel;
