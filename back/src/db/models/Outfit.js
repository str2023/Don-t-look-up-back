const OutfitModel = require('../schemas/outfit');
const splitOutfits = require('../../utils/splitOutfits');

const create = async ({ newOutfit }) => {
  const created = await OutfitModel.create(newOutfit);
  return created;
};

const findByUserId = async ({ userId }) => {
  const unsplitedClothes = await OutfitModel.find({ userId, item: { $exists: false } });
  const unsplitedItems = await OutfitModel.find({ userId, item: { $exists: true } });

  const outfits = splitOutfits(unsplitedClothes, unsplitedItems);
  return outfits;
};

const findByWeather = async ({ weather }) => {
  const { temp, weatherCondition, userId } = weather;
  if (userId) {
    const unsplitedClothes = await OutfitModel.find({ temp, item: { $exists: false }, $or: [{ userId: { $exists: false } }, { userId }] });
    const unsplitedItems = await OutfitModel.find({ weatherCondition, item: { $exists: true }, $or: [{ userId: { $exists: false } }, { userId }] });

    const outfits = splitOutfits(unsplitedClothes, unsplitedItems);
    return outfits;
  }
  const unsplitedClothes = await OutfitModel.find({ temp, item: { $exists: false }, userId: { $exists: false } });
  const unsplitedItems = await OutfitModel.find({ weatherCondition, item: { $exists: true }, userId: { $exists: false } });

  const outfits = splitOutfits(unsplitedClothes, unsplitedItems);
  return outfits;
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
