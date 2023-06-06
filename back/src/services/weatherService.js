const api = require('../utils/api');
const { Weather } = require('../db');

// YYYYMMDDHH
let time = new Date();
time.setHours(time.getHours() + 9);
time = time.toISOString().replaceAll('-', '').replace('T', '').slice(0, 10);

const getUVIdx = async ({ area }) => {
  const areaNo = area || 1100000000; // 추후 카카오맵API 연동
  const addressName = '서울'; // 추후 카카오맵API 연동
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

module.exports = { getUVIdx };
