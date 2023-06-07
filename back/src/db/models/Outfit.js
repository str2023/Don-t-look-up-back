const OutfitModel = require('../schemas/outfit');

const createOutfit = async ({ newOutfit }) => {
  const createdNewOutfit = await OutfitModel.create(newOutfit);
  return createdNewOutfit;
};

const findByUserId = async ({ userId }) => {
  const outfits = await OutfitModel.find({ userId });
  return outfits;
};

const findByWeather = async ({ weather }) => {
  const { temp, weatherCondition } = weather;
  const outfits = await OutfitModel.find({ temp });
  const items = await OutfitModel.find({ weatherCondition });
  // { $and: [{ temp: { $gte: temp - 2 } }, { temp: { $lte: temp + 2 } }] }
  return { outfits, items };
};

const deleteById = async ({ id }) => {
  const removed = await OutfitModel.findOneAndDelete({ _id: id });
  return removed;
};

module.exports = { createOutfit, findByUserId, findByWeather, deleteById };
