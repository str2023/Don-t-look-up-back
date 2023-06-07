const api = require('../utils/api');
const { Weather } = require('../db');
const { getTime } = require('../utils/getTime');

// 자외선 지수
const getUVIdx = async ({ area }) => {
  const areaNo = area || 1100000000; // 추후 카카오맵API 연동
  const addressName = '서울'; // 추후 카카오맵API 연동
  const time = getTime().YMDH;
  // DB에 있는지 날씨 조회
  const weather = await Weather.findByAddressName({ addressName });
  try {
    if (weather.UVIdx.date - time < 3) {
      return weather.UVIdx;
    }
  } catch (err) {
    console.error('DB에 자외선지수 없음');
  }
  // 없다면 기상청 API 통신
  const res = await api.getUVIdx(areaNo, time);
  // 데이터 정제
  const { date, h0, h3, h6, h9, h12 } = res.data.response.body.items.item[0];
  [date, h0, h3, h6].forEach((value) => parseInt(value, 10));
  const UVIdx = { date, h0, h3, h6, h9, h12 };
  // DB에 삽입갱신
  if (weather) {
    const newWeather = { areaNo, UVIdx };
    await Weather.update({ addressName, newWeather });
  } else {
    const newWeather = { addressName, areaNo, UVIdx };
    await Weather.create({ newWeather });
  }
  return UVIdx;
};

// 초단기 실황
const getUltraSrtNcst = async ({ area }) => {
  const { nx, ny } = area || { nx: 55, ny: 127 };
  const addressName = '서울'; // 추후 카카오맵API 연동

  const time = getTime();
  const date = time.YMD;
  const hour = time.HH;
  // DB에 있는지 날씨 조회
  const weather = await Weather.findByAddressName({ addressName });
  try {
    if (weather.UltraSrtNcst.baseDate === date && weather.UltraSrtNcst.baseTime === parseInt(hour, 10)) {
      return weather.UltraSrtNcst;
    }
  } catch (err) {
    console.error('DB에 초단기실황 없음');
  }
  // 없다면 기상청 API 통신
  const url = '/getUltraSrtNcst';
  const res = await api.getVilageFcst(url, date, hour, nx, ny);
  // 데이터 정제
  const UltraSrtNcst = {};
  res.data.response.body.items.item.forEach((obj) => {
    UltraSrtNcst.baseDate = parseInt(obj.baseDate, 10);
    UltraSrtNcst.baseTime = parseInt(obj.baseTime, 10);
    UltraSrtNcst[obj.category] = parseInt(obj.obsrValue, 10);
  });
  // DB에 삽입갱신
  if (weather) {
    const newWeather = { UltraSrtNcst };
    await Weather.update({ addressName, newWeather });
  } else {
    const newWeather = { addressName, UltraSrtNcst };
    await Weather.create({ newWeather });
  }
  return UltraSrtNcst;
};

// 초단기 예보
const getUltraSrtFcst = async ({ area }) => {
  const { nx, ny } = area || { nx: 55, ny: 127 };
  const addressName = '서울';
  const time = getTime();
  const date = time.YMD;
  const hour = time.HH;
  // DB에 있는지 날씨 조회
  const weather = await Weather.findByAddressName({ addressName });
  try {
    if (weather.UltraSrtFcst.baseDate === date && weather.UltraSrtFcst.baseTime === parseInt(hour, 10)) {
      return weather.UltraSrtFcst;
    }
  } catch (err) {
    console.error('DB에 초단기예보 없음');
  }
  // 없다면 기상청 API 통신
  const url = '/getUltraSrtFcst';
  const res = await api.getVilageFcst(url, date, hour, nx, ny);
  // 데이터 정제
  // DB에 삽입갱신
  return res.data.response.body.items.item;
};

// 단기 예보
const getVilageFcst = async ({ area }) => {
  const { nx, ny } = area || { nx: 55, ny: 127 };
  const addressName = '서울';
  const time = getTime();
  const date = time.YMD;
  const hour = time.HM;
  // DB에 있는지 날씨 조회
  const weather = await Weather.findByAddressName({ addressName });
  try {
    if (weather.VilageFcst.baseDate === date && weather.VilageFcst.baseTime === parseInt(hour, 10)) {
      return weather.VilageFcst;
    }
  } catch (err) {
    console.error('DB에 단기예보 없음');
  }
  // 없다면 기상청 API 통신
  const url = '/getVilageFcst';
  const res = await api.getVilageFcst(url, date, hour, nx, ny);
  // 데이터 정제
  // DB에 삽입갱신
  return res.data.response.body.items.item;
};

module.exports = { getUVIdx, getUltraSrtNcst, getUltraSrtFcst, getVilageFcst };
