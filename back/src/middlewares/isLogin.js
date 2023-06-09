const jwt = require('jsonwebtoken');

function isLogin(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers.authorization?.split(' ')[1] ?? 'null';

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임.
  // 토큰이 "null" 일 경우, loginRequired 가 필요한 서비스 사용을 제한함.
  if (userToken === 'null') {
    console.log('비회원입니다.');
    req.isLogin = false;
    next();
    return;
  }

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 userId 정보 추출
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const { userId } = jwtDecoded;
    req.currentUserId = userId;
    req.isLogin = true;
    next();
    console.log('회원입니다.');
  } catch (error) {
    req.isLogin = false;
    next();
    console.log('비회원입니다.');
  }
}

module.exports = isLogin;
