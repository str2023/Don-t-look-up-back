const { Outfit } = require('../db');

const createOutfit = async ({ newOutfit }) => {
  const createdNewOutfit = await Outfit.create({ newOutfit });
  return createdNewOutfit;
};

const getOutfitByUserId = async ({ userId }) => {
  const { outfits, items } = await Outfit.findByUserId({ userId });
  return { outfits, items };
};

const getOutfitByWeather = async ({ weather }) => {
  const { outfits, items } = await Outfit.findByWeather({ weather });
  return { outfits, items };
};

const setOutfit = async ({ id, newOutfit }) => {
  const updated = await Outfit.update({ id, newOutfit });
  return updated;
};

const deleteOutfit = async ({ id }) => {
  const removed = await Outfit.deleteById({ id });
  return removed;
};

module.exports = { createOutfit, getOutfitByUserId, getOutfitByWeather, setOutfit, deleteOutfit };
