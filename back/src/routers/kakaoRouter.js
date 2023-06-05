const kakaoRouter = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const axios = require('axios');
const bcrypt = require('bcrypt');

const kakaoConfig = require('../db/models/config/kakao.json');
const User = require('../db');

// localhost:5001/oauth/login 접속 시, 카카오 로그인 url로 redirect되는 라우터
kakaoRouter.get('/login', (req, res) => {
  const config = {
    client_id: kakaoConfig.client_id,
    redirect_uri: kakaoConfig.redirect_uri[0],
    response_type: 'code',
  };

  const finalUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&response_type=code`;

  console.log(`서버: ${finalUrl}로 리다이렉트`);

  res.redirect(finalUrl);
});

// 로그인 이후 /oauth/login/callback 으로 redirect 되었을 때 토큰을 받아오는 라우터
kakaoRouter.get('/login/callback', async (req, res) => {
  const config = {
    client_id: kakaoConfig.client_id,
    client_secret: kakaoConfig.client_secret,
    redirect_uri: kakaoConfig.redirect_uri[0],
    code: req.query.code,
  };

  let kakaoToken; // 사용자 동의 후 받아온 인가코드로 토큰을 발급받아 kakaoToken에 저장
  try {
    kakaoToken = await axios({
      method: 'POST',
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${config.client_id}&client_secret=${config.client_secret}&redirect_uri=${config.redirect_uri}&code=${config.code}`,
      headers: {
        'content-type':
          'Content-type: application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  } catch (err) {
    console.log(`토큰 가져오기 에러: ${err.data}`);
  }
  console.log(kakaoToken); // 성공적으로 토큰이 받아와진 경우, [object Object]로 출력

  const accessToken = kakaoToken.data.access_token; // 인증에 사용될 엑세스/어드민 토큰을 따로 저장

  let kakaoUser; // 엑세스 토큰을 통해 받아온 사용자 정보를 kakaoUser에 저장
  try {
    kakaoUser = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  } catch (err) {
    console.log(`사용자 정보 가져오기 에러: ${err.data}`);
  }
  console.log(kakaoUser.data); // 가져온 정보값 콘솔창에서 확인

  const kakaoUserInfo = kakaoUser.data;

  // 카카오 사용자 정보를 정제하여 loginInfo에 저장
  const { email } = kakaoUserInfo.kakao_account;
  const password = `${kakaoUserInfo.id}${Math.random().toString(36).slice(2)};`; // pw는 유저id + 랜덤 문자열 조합
  const nickName = kakaoUserInfo.properties.nickname;
  const birthDate = kakaoUserInfo.kakao_account.birthday;
  const { gender } = kakaoUserInfo.kakao_account;

  const hashedPassword = await bcrypt.hash(password, 10); // pw 해쉬화
  const numberedGender = gender === 'female' ? 1 : 0; // 성별 숫자화: 여성- 1 / 남성 -0

  const newUser = {
    email,
    password: hashedPassword,
    nickName,
    birthDate,
    gender: numberedGender,
  };

  const createdNewUser = await User.create({ newUser }); // 카카오 정보로 newUser 생성
  createdNewUser.errorMessage = null;

  res.status(200).json(newUser);
  console.log(`Say hi to new user ${newUser.nickName}!`);
});

module.exports = kakaoRouter;
