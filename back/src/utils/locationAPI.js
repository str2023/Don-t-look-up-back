/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');

// 카카오 로컬 API로 location 데이터 받아오기: area는 반드시 '시-구-동' 지번 주소로만
const getAddress = async ({ area }) => {
  const finalUrl = 'https://dapi.kakao.com/v2/local/search/address.json';

  let info;

  try {
    info = await axios({
      method: 'GET',
      url: finalUrl,
      headers: {
        Authorization: `KakaoAK ${process.env.CLIENT_ID}`,
        'Content-type': 'application/json;charset=UTF-8',
      },
      params: {
        query: area,
        analyze_type: 'similar',
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  const finalInfo = info.data.documents[0];

  return finalInfo;
};

const getAddressByWGS = async ({ lat, lon }) => {
  const finalUrl = 'https://dapi.kakao.com/v2/local/geo/coord2address.json';

  let info;

  try {
    info = await axios({
      method: 'GET',
      url: finalUrl,
      headers: {
        Authorization: `KakaoAK ${process.env.CLIENT_ID}`,
        'Content-type': 'application/json;charset=UTF-8',
      },
      params: {
        x: lon,
        y: lat,
        input_coord: 'WGS84',
      },
    });
  } catch (error) {
    console.log(error.message);
  }
  const finalInfo = getAddress({ area: info.data.documents[0].address.address_name });

  return finalInfo;
};
module.exports = { getAddress, getAddressByWGS };
