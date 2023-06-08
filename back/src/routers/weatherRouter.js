const weatherRouter = require('express').Router();
const weatherService = require('../services/weatherService');
// const loginRequired = require('../middlewares/loginRequired');
const asyncHandler = require('../utils/asyncHandler');
const getArea = require('../middlewares/getArea');

// 자외선 지수 라우터. body에 위도, 경도 값이 들어온다.
weatherRouter.get(
  '/UVIdx',
  getArea,
  asyncHandler(async (req, res, next) => {
    //  #swagger.description = '자외선 지수'
    //  #swagger.tags = ['날씨']
    /*  #swagger.parameters[''] = {
                  in: 'body',
                  schema: {
                      area: '시-구-동 지번 주소'
                  }
        } */
    /*  #swagger.responses[200] = {
              description: '자외선지수',
              schema: {
                  UVIdx: {
                    date: '관측시간',
                    h0: '현재',
                    h3: '3시간후',
                    h6: '6시간후',
                    h9: '9시간후',
                    h12: '12시간후'
                  }
              }
  } */
    const { Area } = req.AreaInfo;
    const UVIdx = await weatherService.getUVIdx({ Area });
    res.status(200).send(UVIdx);
  }),
);

weatherRouter.get(
  '/UltraSrtNcst',
  getArea,
  asyncHandler(async (req, res, next) => {
    //  #swagger.description = '초단기 실황'
    //  #swagger.tags = ['날씨']
    /*  #swagger.parameters[''] = {
                  in: 'body',
                  schema: {
                      area: '시-구-동 지번 주소'
                  }
        } */
    /*  #swagger.responses[200] = {
              description: '초단기 실황',
              schema: {
                  UltraSrtNcst: {
                    baseDate: '관측날짜',
                    baseTime: '관측시간',
                    Current:   {
                                  fcstDate: '예보날짜',
                                  fcstTime: '예보시간',
                                  POP: '강수확률',
                                  PTY: '강수형태코드값' ,
                                  PCP: '1시간 강수량  mm',
                                  RN1: '1시간 강수량  mm',
                                  T1H: '기온	℃',
                                  TMP: '1시간 기온',
                                  TMN: '일 최저기온',
                                  TMX: '일 최고기온',
                                  SNO: '1시간 신적설',
                                  SKY: '하늘상태 코드값',
                                  REH: '습도  %',
                                  VEC: '풍향  deg',
                                  WSD: '풍속  m/s',
                                },
                  },
              }
  } */
    const { Area } = req.AreaInfo;
    const UltraSrtNcst = await weatherService.getUltraSrtNcst({ Area });
    res.status(200).send(UltraSrtNcst);
  }),
);

weatherRouter.get(
  '/UltraSrtFcst',
  getArea,
  asyncHandler(async (req, res, next) => {
    //  #swagger.description = '초단기 예보'
    //  #swagger.tags = ['날씨']
    /*  #swagger.parameters[''] = {
                  in: 'body',
                  schema: {
                      area: '시-구-동 지번 주소'
                  }
        } */
    /*  #swagger.responses[200] = {
              description: '초단기 예보',
              schema: {
                  UltraSrtNcst: {
                    baseDate: '관측날짜',
                    baseTime: '관측시간',
                    Current:   [{
                                  fcstDate: '예보날짜',
                                  fcstTime: '예보시간',
                                  POP: '강수확률',
                                  PTY: '강수형태코드값' ,
                                  PCP: '1시간 강수량  mm',
                                  RN1: '1시간 강수량  mm',
                                  T1H: '기온	℃',
                                  TMP: '1시간 기온',
                                  TMN: '일 최저기온',
                                  TMX: '일 최고기온',
                                  SNO: '1시간 신적설',
                                  SKY: '하늘상태 코드값',
                                  REH: '습도  %',
                                  VEC: '풍향  deg',
                                  WSD: '풍속  m/s',
                                }],
                  },
              }
  } */
    const { Area } = req.AreaInfo;
    const UltraSrtFcst = await weatherService.getUltraSrtFcst({ Area });
    res.status(200).send(UltraSrtFcst);
  }),
);

weatherRouter.get(
  '/VilageFcst',
  getArea,
  asyncHandler(async (req, res, next) => {
    //  #swagger.description = '단기 예보'
    //  #swagger.tags = ['get']
    /*  #swagger.parameters[''] = {
                  in: 'body',
                  schema: {
                      area: '시-구-동 지번 주소'
                  }
        } */
    /*  #swagger.responses[200] = {
              description: '단기 예보',
              schema: {
                  UltraSrtNcst: {
                    baseDate: '관측날짜',
                    baseTime: '관측시간',
                    Current:   [{
                                  fcstDate: '예보날짜',
                                  fcstTime: '예보시간',
                                  POP: '강수확률',
                                  PTY: '강수형태코드값' ,
                                  PCP: '1시간 강수량  mm',
                                  RN1: '1시간 강수량  mm',
                                  T1H: '기온	℃',
                                  TMP: '1시간 기온',
                                  TMN: '일 최저기온',
                                  TMX: '일 최고기온',
                                  SNO: '1시간 신적설',
                                  SKY: '하늘상태 코드값',
                                  REH: '습도  %',
                                  VEC: '풍향  deg',
                                  WSD: '풍속  m/s',
                                }],
                  },
              }
  } */
    const { Area } = req.AreaInfo;
    const VilageFcst = await weatherService.getVilageFcst({ Area });
    res.status(200).send(VilageFcst);
  }),
);

module.exports = weatherRouter;
