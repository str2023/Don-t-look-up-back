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

module.exports = { getUVIdx };
