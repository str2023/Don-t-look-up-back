const splitOutfits = (unsplitedClothes, unsplitedItems) => {
  const { top } = unsplitedClothes[0];
  const { bottom } = unsplitedClothes[0];
  const { outer } = unsplitedClothes[0];
  const { shoes } = unsplitedClothes[0];
  const { item } = unsplitedItems[0];

  const clothes = {
    id: unsplitedClothes[0].id,
    temp: unsplitedClothes[0].temp,
    top: top.split(','),
    bottom: bottom.split(','),
    outer: outer.split(','),
    shoes: shoes.split(','),
  };

  const items = {
    id: unsplitedItems[0].id,
    weatherCondition: unsplitedItems[0].weatherCondition,
    item: item.split(','),
  };

  const outfits = {
    clothes,
    items,
  };

  return { outfits };
};

module.exports = splitOutfits;
