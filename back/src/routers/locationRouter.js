const locationRouter = require('express').Router();
const Location = require('../services/locationService');
const asyncHandler = require('../utils/asyncHandler');

locationRouter.get(
  '/location',
  asyncHandler(async (req, res, next) => {
    const { area, lat, lon } = req.query;
    const areaInfo = await Location.getAddressInfo({ area, lat, lon });

    res.status(200).send(areaInfo);
  }),
);

module.exports = locationRouter;
