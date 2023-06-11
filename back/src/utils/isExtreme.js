const weatherAPI = require('../utils/weatherAPI');
const { getTime } = require('../utils/getTime');

const isExtreme = async ({ Area }) => {
  const nx = Area.x;
  const ny = Area.y;

  const time = getTime();
  const date = time.YMD;
  const hour = `${0}${parseInt('230')}`;
  // 오전 2시 30분 기준 초단기예보

  const url = '/getUltraSrtFcst';
  const res = await weatherAPI.getWeather(url, date, hour, nx, ny);
  const data = res.data.response.body.items.item; // dtype = array

  // 초단기예보 중, 기온(T1H) 카테고리만 따로 T1H에 저장
  const T1H = data.filter((obj) => obj.category === 'T1H');
  const TMX32 = T1H.filter((obj) => 33 > parseInt(obj.fcstValue) >= 31);
  const TMX35 = T1H.filter((obj) => parseInt(obj.fcstValue) >= 33);
  const TMN12 = T1H.filter((obj) => -15 < parseInt(obj.fcstValue) <= -12);
  const TMN15 = T1H.filter((obj) => -18 < parseInt(obj.fcstValue) <= -15);
  const TMN18 = T1H.filter((obj) => parseInt(obj.fcstValue) <= -18);

  const isTMX32 = TMX32.length !== 0 ? true : false; // 폭염-관심
  const isTMX35 = TMX35.length !== 0 ? true : false; // 폭염-주의
  const isTMN12 = TMN12.length !== 0 ? true : false; // 한파-주의
  const isTMN15 = TMN15.length !== 0 ? true : false; // 한파-경고
  const isTMN18 = TMN18.length !== 0 ? true : false; // 한파-심각

  return { isTMX32, isTMX35, isTMN12, isTMN15, isTMN18 };
};

module.exports = isExtreme;
