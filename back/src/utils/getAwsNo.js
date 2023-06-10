// AWS 관측 지점
const getAwsNo = (si) => {
  const awsObj = {
    108: ['전국'],
    109: ['서울', '인천', '경기'],
    159: ['부산', '울산', '경남'],
    143: ['대구', '경북'],
    156: ['광주', '전남'],
    146: ['전북'],
    133: ['대전', '세종', '충남'],
    131: ['충북'],
    105: ['강원'],
    184: ['제주'],
  };
  const awsNo = Object.keys(awsObj).find((key) => awsObj[key].includes(si));
  return awsNo;
};

module.exports = getAwsNo;
