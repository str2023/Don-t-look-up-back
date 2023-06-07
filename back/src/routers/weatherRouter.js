const weatherRouter = require('express').Router();
const weatherService = require('../services/weatherService');
// const loginRequired = require('../middlewares/loginRequired');
const asyncHandler = require('../utils/asyncHandler');

// 자외선 지수 라우터. body에 위도, 경도 값이 들어온다.
weatherRouter.get(
  '/UVIdx',
  asyncHandler(async (req, res, next) => {
    const { area } = req.body;
    const UVIdx = await weatherService.getUVIdx({ area });
    res.status(200).send(UVIdx);
  }),
);

weatherRouter.get(
  '/UltraSrtNcst',
  asyncHandler(async (req, res, next) => {
    const { area } = req.body;
    const UltraSrtNcst = await weatherService.getUltraSrtNcst({ area });
    res.status(200).send(UltraSrtNcst);
  }),
);

weatherRouter.get(
  '/UltraSrtFcst',
  asyncHandler(async (req, res, next) => {
    const { area } = req.body;
    const UltraSrtFcst = await weatherService.getUltraSrtFcst({ area });
    res.status(200).send(UltraSrtFcst);
  }),
);

weatherRouter.get(
  '/VilageFcst',
  asyncHandler(async (req, res, next) => {
    const { area } = req.body;
    const VilageFcst = await weatherService.getVilageFcst({ area });
    res.status(200).send(VilageFcst);
  }),
);

module.exports = weatherRouter;
