const { Schema, model } = require('mongoose');
const nanoid = require('nanoid');

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: () => nanoid(),
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;
