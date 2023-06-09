const weatherRouter = require('express').Router();
const weatherService = require('../services/weatherService');
// const loginRequired = require('../middlewares/loginRequired');
const asyncHandler = require('../utils/asyncHandler');
const getArea = require('../middlewares/getArea');

// 자외선 지수 라우터. params에 주솟값이 들어온다.
weatherRouter.get(
  '/UVIdx',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { Area } = req.AreaInfo;
    const UVIdx = await weatherService.getUVIdx({ Area });
    res.status(200).send(UVIdx);
  }),
);
// 초단기 실황. 현재 날씨 조회
weatherRouter.get(
  '/UltraSrtNcst',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { Area } = req.AreaInfo;
    const UltraSrtNcst = await weatherService.getUltraSrtNcst({ Area });
    res.status(200).send(UltraSrtNcst);
  }),
);
// 초단기 예보. 내일모레글피까지의 날씨 예보
weatherRouter.get(
  '/UltraSrtFcst',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { Area } = req.AreaInfo;
    const UltraSrtFcst = await weatherService.getUltraSrtFcst({ Area });
    res.status(200).send(UltraSrtFcst);
  }),
);
// 단기 예보.
weatherRouter.get(
  '/VilageFcst',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { Area } = req.AreaInfo;
    const VilageFcst = await weatherService.getVilageFcst({ Area });
    res.status(200).send(VilageFcst);
  }),
);
// 기상정보문
weatherRouter.get(
  '/WthrInfo',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { Area } = req.AreaInfo;
    const WthrInfo = await weatherService.getWeatherInfo({ Area });
    res.status(200).send(WthrInfo);
  }),
);
module.exports = weatherRouter;
