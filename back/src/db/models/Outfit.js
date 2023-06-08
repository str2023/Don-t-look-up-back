const OutfitModel = require('../schemas/outfit');

const create = async ({ newOutfit }) => {
  const createdNewOutfit = await OutfitModel.create(newOutfit);
  return createdNewOutfit;
};

const findByUserId = async ({ userId }) => {
  const outfits = await OutfitModel.find({ userId, item: { $exists: false } });
  const items = await OutfitModel.find({ userId, item: { $exists: true } });
  return { outfits, items };
};

const findByWeather = async ({ weather }) => {
  const { temp, weatherCondition } = weather;
  const outfits = await OutfitModel.find({ temp, item: { $exists: false } });
  const items = await OutfitModel.find({ weatherCondition, item: { $exists: true } });
  // { $and: [{ temp: { $gte: temp - 2 } }, { temp: { $lte: temp + 2 } }] }
  return { outfits, items };
};

const update = async ({ id, newOutfit }) => {
  const updated = await OutfitModel.findOneAndUpdate({ _id: id }, newOutfit, { new: true });
  return updated;
};

const deleteById = async ({ id }) => {
  const removed = await OutfitModel.findOneAndDelete({ _id: id });
  return removed;
};

module.exports = { create, findByUserId, findByWeather, deleteById, update };
