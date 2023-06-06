const api = require('../utils/api');
const { Weather } = require('../db');
const { getTime } = require('../utils/getTime');

const getUVIdx = async ({ area }) => {
  const areaNo = area || 1100000000; // 추후 카카오맵API 연동
  const addressName = '서울'; // 추후 카카오맵API 연동
  const time = getTime().YMDH;
  const weather = await Weather.findByAreaNo({ areaNo });
  if (weather) {
    // DB에 날씨 정보가 있다면 그 값을 반환
    // 관측시간 비교 필요
    if (weather.UVIdx) {
      return weather.UVIdx;
    }
  }
  const res = await api.getUVIdx(areaNo, time);
  const { date, h0, h3, h6 } = res.data.response.body.items.item[0];
  const UVIdx = { date, h0, h3, h6 };
  if (weather) {
    const newWeather = { UVIdx };
    await Weather.update({ addressName, newWeather });
  }
  return UVIdx;
};

const getUltraSrtNcst = async ({ area }) => {
  const { nx, ny } = area || { nx: 55, ny: 127 };
  const time = getTime();
  const date = time.YMD;
  const hour = `${time.HH}00`;
  const res = await api.getUltraSrtNcst(date, hour, nx, ny);
  const UltraSrtNcst = res.data.response;
  return UltraSrtNcst;
};

module.exports = { getUVIdx, getUltraSrtNcst };
