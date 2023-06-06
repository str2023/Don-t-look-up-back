// YYYYMMDDHH
const getTime = () => {
  const time = {};
  const dateRaw = new Date();
  dateRaw.setHours(dateRaw.getHours() + 9);
  const dateForWthrIdx = dateRaw.toISOString().replaceAll('-', '').replace('T', '').slice(0, 10);
  dateRaw.setHours(dateRaw.getHours() - 1); // 예보확인을 위한 1시간 전의 시간
  const dateForFcst = dateRaw.toISOString().replaceAll('-', '').split('T');

  const YMD = dateForFcst[0];
  const HH = dateForFcst[1].split(':')[0];
  const YMDH = dateForWthrIdx;

  time.YMDH = YMDH;
  time.YMD = YMD;
  time.HH = HH;
  return time;
};
exports.getTime = getTime;
