const { Outfit } = require('../db');

const createOutfit = async ({ newOutfit }) => {
  const created = await Outfit.create({ newOutfit });

  if (!created) {
    const errorMessage = '등록에 실패했습니다.';
    return { errorMessage };
  }

  return created;
};

const getOutfitByUserId = async ({ userId }) => {
  const outfits = await Outfit.findByUserId({ userId });

  if (!outfits) {
    const errorMessage = '등록된 옷차림이 없습니다.';
    return { errorMessage };
  }

  return outfits;
};

const getOutfitByWeather = async ({ weather }) => {
  const outfits = await Outfit.findByWeather({ weather });

  if (!outfits) {
    const errorMessage = '현재 날씨에 추천할 옷차림이 없습니다.';
    return { errorMessage };
  }

  return outfits;
};

const setOutfit = async ({ id, newOutfit }) => {
  const updated = await Outfit.update({ id, newOutfit });

  if (!updated) {
    const errorMessage = '수정에 실패했습니다.';
    return { errorMessage };
  }

  return updated;
};

const deleteOutfit = async ({ id }) => {
  const removed = await Outfit.deleteById({ id });

  if (!removed) {
    const errorMessage = '삭제에 실패했습니다.';
    return { errorMessage };
  }

  return removed;
};

module.exports = { createOutfit, getOutfitByUserId, getOutfitByWeather, setOutfit, deleteOutfit };
