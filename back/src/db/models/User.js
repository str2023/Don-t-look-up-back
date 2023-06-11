const UserModel = require('../schemas/user');

const create = async ({ newUser }) => {
  const createdNewUser = await UserModel.create(newUser);
  return createdNewUser;
};

const findByEmail = async ({ email }) => {
  const user = await UserModel.findOne({ email });
  return user;
};

const findById = async ({ userId }) => {
  const user = await UserModel.findOne({ id: userId });
  return user;
};

const findAll = async () => {
  const users = await UserModel.find({});
  return users;
};

const update = async ({ userId, fieldToUpdate, newValue }) => {
  const filter = { id: userId };
  const updateData = { [fieldToUpdate]: newValue };
  const option = { new: true };

  const updatedUser = await UserModel.findOneAndUpdate(filter, updateData, option);
  return updatedUser;
};

const addFavorite = async ({ userId, area }) => {
  const favorite = await UserModel.findOneAndUpdate(
    { id: userId },
    {
      $addToSet: {
        favorite: area,
      },
    },
    { new: true },
  ).favorite;
  return favorite;
};

const subFavorite = async ({ userId, area }) => {
  const favorite = await UserModel.findOneAndUpdate(
    { id: userId },
    {
      $pull: {
        favorite: area,
      },
    },
    { new: true },
  ).favorite;
  return favorite;
};

const remove = async ({ userId }) => {
  const withdrawalUser = await UserModel.findOneAndDelete({ id: userId });
  return withdrawalUser;
};

module.exports = { create, findByEmail, findById, findAll, update, addFavorite, subFavorite, remove };
