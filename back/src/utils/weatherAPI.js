/* eslint-disable camelcase */
const axios = require('axios');

const getUVIdx = async (areaNo, time) => {
  console.log('자외선 API 요청');
  const url = 'http://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4';
  return axios.get(url, {
    params: {
      serviceKey: process.env.WEATHER_DKEY,
      pageNo: 1,
      numOfRows: 10,
      dataType: 'JSON',
      areaNo,
      time,
    },
  });
};

const getWeather = async (url, date, hour, nx, ny) =>
  axios.get(url, {
    baseURL: 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0',
    params: {
      serviceKey: process.env.WEATHER_DKEY,
      pageNo: 1,
      numOfRows: 1000,
      dataType: 'JSON',
      base_date: date,
      base_time: hour,
      nx,
      ny,
    },
  });

const getWeatherInfo = async (url, YMD, stnId = 108) =>
  axios.get(url, {
    baseURL: 'http://apis.data.go.kr/1360000/WthrWrnInfoService',
    params: {
      serviceKey: process.env.WEATHER_DKEY,
      pageNo: 1,
      numOfRows: 1,
      dataType: 'JSON',
      stnId,
      fromTmFc: YMD - 5,
      toTmFc: YMD,
    },
  });

const getAction = async (url) => {
  try {
    const response = await axios.get(url, {
      baseURL: 'http://apis.data.go.kr/1360000/ImpactInfoService',
      params: {
        serviceKey: process.env.WEATHER_DKEY,
        pageNo: 1,
        numOfRows: 10,
        dataType: 'JSON',
        clsfc: 1,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getUVIdx, getWeather, getWeatherInfo, getAction };
