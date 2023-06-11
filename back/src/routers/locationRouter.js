const locationRouter = require('express').Router();
const Location = require('../services/locationService');
const asyncHandler = require('../utils/asyncHandler');

locationRouter.get(
  '/location',
  asyncHandler(async (req, res, next) => {
    const { area } = req.query;
    const areaNo = await Location.getAddressInfo({ area });

    res.status(200).send(areaNo);
  }),
);

module.exports = locationRouter;