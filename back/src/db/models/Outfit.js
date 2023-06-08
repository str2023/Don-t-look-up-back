const OutfitModel = require('../schemas/outfit');

const create = async ({ newOutfit }) => {
  const created = await OutfitModel.create(newOutfit);
  return created;
};

const findByUserId = async ({ userId }) => {
  const clothes = await OutfitModel.find({ userId, item: { $exists: false } });
  const items = await OutfitModel.find({ userId, item: { $exists: true } });

  return { clothes, items };
};

const findByWeather = async ({ weather }) => {
  const { temp, weatherCondition, userId } = weather;
  if (userId) {
    const clothes = await OutfitModel.find({ temp, item: { $exists: false }, $or: [{ userId: { $exists: false } }, { userId }] });
    const items = await OutfitModel.find({ weatherCondition, item: { $exists: true }, $or: [{ userId: { $exists: false } }, { userId }] });

    return { clothes, items };
  }
  const clothes = await OutfitModel.find({ temp, item: { $exists: false }, userId: { $exists: false } });
  const items = await OutfitModel.find({ weatherCondition, item: { $exists: true }, userId: { $exists: false } });

  return { clothes, items };
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
