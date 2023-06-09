const outfitRouter = require('express').Router();
const outfitService = require('../services/outfitService');
const asyncHandler = require('../utils/asyncHandler');
const loginRequired = require('../middlewares/loginRequired');

outfitRouter.get(
  '/outfit',
  asyncHandler(async (req, res, next) => {
    const { temp, wx } = req.query;
    const weather = { temp, wx };
    const outfits = await outfitService.getOutfitByWeather({ weather });
    res.status(200).send(outfits);
  }),
);
// 로그인된 상태에서 커스텀 옷차림도 같이 보여주는 API
outfitRouter.get(
  '/outfitLogin',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { temp, wx } = req.query;
    const weather = { temp, wx };
    weather.userId = req.currentUserId;
    const outfits = await outfitService.getOutfitByWeather({ weather });
    res.status(200).send(outfits);
  }),
);

outfitRouter.get(
  '/outfit/custom',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const outfits = await outfitService.getOutfitByUserId({ userId });

    if (outfits.errorMessage) {
      res.status(404).send(outfits.errorMessage);
      return;
    }

    res.status(200).send(outfits);
  }),
);

outfitRouter.post(
  '/outfit/custom',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { wx, temp, item, top, bottom, outer, shoes } = req.body;
    const newOutfit = { wx, temp, item, top, bottom, outer, shoes };
    newOutfit.userId = req.currentUserId;
    const outfit = await outfitService.createOutfit({ newOutfit });

    if (outfit.errorMessage) {
      res.status(400).send(outfit.errorMessage);
      return;
    }

    res.status(201).send(outfit);
  }),
);

outfitRouter.put(
  '/outfit/custom',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { id, newOutfit } = req.body;
    newOutfit.userId = req.currentUserId;
    const outfit = await outfitService.setOutfit({ id, newOutfit });

    if (outfit.errorMessage) {
      res.status(400).send(outfit.errorMessage);
      return;
    }

    res.status(200).send(outfit);
  }),
);

outfitRouter.delete(
  '/outfit/custom',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const userId = req.currentUserId;
    const outfit = await outfitService.deleteOutfit({ id, userId });

    if (outfit.errorMessage) {
      res.status(400).send(outfit.errorMessage);
      return;
    }

    res.status(201).send(outfit);
  }),
);

module.exports = outfitRouter;
