const methodRouter = require('express').Router();
const methodService = require('../services/methodService');
// const loginRequired = require('../middlewares/loginRequired');
const asyncHandler = require('../utils/asyncHandler');
const getArea = require('../middlewares/getArea');

methodRouter.get(
  '/weatherMthd',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { Area } = req.AreaInfo;
    const Info = await methodService.getMthd({ Area });
    res.status(200).send(Info);
  }),
);

module.exports = methodRouter;
