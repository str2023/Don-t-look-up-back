const locationService = require('../services/locationService');

const getArea = async (req, res, next) => {
  const { area } = req.query;
  if (!area) {
    res.status(400).send('area 요청정보가 없습니다');
    return;
  }
  const areaInfo = await locationService.getAddressInfo({ area });

  const Area = {
    Name: areaInfo.locationName,
    No: areaInfo.locationNo,
    x: areaInfo.x,
    y: areaInfo.y,
    si: areaInfo.si,
  };

  req.AreaInfo = { Area };
  next();
};

module.exports = getArea;
