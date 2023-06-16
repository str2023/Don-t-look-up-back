const { Method } = require('../db');
const isHWCorCWC = require('../utils/isExtreme');
const weatherAPI = require('../utils/weatherAPI');

const getMthd = async ({ Area }) => {
  const { isTMX32, isTMX35, isTMN12, isTMN15, isTMN18 } = await isExtreme({ Area });

  const HWCurl = '/getHWCntrmsrMthd';
  const CWCurl = '/getCWCntrmsrMthd';

  const HWCres = await weatherAPI.getAction(HWCurl);
  const CWCres = await weatherAPI.getAction(CWCurl);

  const HWCdata = HWCres.response.body.items.item;
  const CWCdata = CWCres.response.body.items.item;

  if (isExtreme.isTMX32 === true) {
    const HWC32 = HWCdata.filter((obj) => obj.value == '관심').map((obj) => ({
      [obj.cntrmsrCode]: obj.cntrmsrMthd,
    }));

    const HWC32Mthd = HWC32.reduce((HWC32Mthd, obj) => {
      const index = HWC32.indexOf(obj);
      const key = Object.keys(obj)[0];
      const value = obj[key];
      HWC32Mthd[index] = value;
      return HWC32Mthd;
    }, {});

    return HWC32Mthd;
  }

  if (isExtreme.isTMX35 === true) {
    const HWC35 = HWCdata.filter((obj) => obj.value == '주의').map((obj) => ({
      [obj.cntrmsrCode]: obj.cntrmsrMthd,
    }));

    const HWC35Mthd = HWC35.reduce((HWC35Mthd, obj) => {
      const index = HWC35.indexOf(obj);
      const key = Object.keys(obj)[0];
      const value = obj[key];
      HWC35Mthd[index] = value;
      return HWC35Mthd;
    }, {});

    return HWC35Mthd;
  }

  if (isTMN12 === true) {
    const CWC12 = CWCdata.filter((obj) => obj.value === '주의').map((obj) => ({
      [obj.cntrmsrCode]: obj.cntrmsrMthdt,
    }));

    const CWC12Mthd = CWC12.reduce((CWC12Mthd, obj) => {
      const index = CWC12.indexOf(obj);
      const key = Object.keys(obj);
      const value = obj[key];
      CWC12Mthd[index] = value;
      return CWC12Mthd;
    }, {});

    return CWC12Mthd;
  }

  if (isTMN15 === true) {
    const CWC15 = CWCdata.filter((obj) => obj.value === '경고').map((obj) => ({
      [obj.cntrmsrCode]: obj.cntrmsrMthd,
    }));

    const CWC15Mthd = CWC15.reduce((CWC15Mthd, obj) => {
      const index = CWC15.indexOf(obj);
      const key = Object.keys(obj);
      const value = obj[key];
      CWC15Mthd[index] = value;
      return CWC15Mthd;
    }, {});

    return CWC15Mthd;
  }

  if (isExtreme.isTMN18 !== true) {
    const CWC18 = CWCdata.filter((obj) => obj.value === '심각').map((obj) => ({
      [obj.cntrmsrCode]: obj.cntrmsrMthd,
    }));

    const CWC18Mthd = CWC18.reduce((CWC18Mthd, obj) => {
      const index = CWC18.indexOf(obj);
      const key = Object.keys(obj);
      const value = obj[key];
      CWC18Mthd[index] = value;
      return CWC18Mthd;
    }, {});

    return CWC18Mthd;
  }

  return '평년 기온';
};

module.exports = {
  getMthd,
};
