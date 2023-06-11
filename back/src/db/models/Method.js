const MethodModel = require('../schemas/method');

const create = async ({ newMethod }) => {
  const createdNewMethod = await MethodModel.create(newMethod);
  return createdNewMethod;
};

const findByTemp = async ({ temp }) => {
  const method = await MethodModel.findOne({ temp });
  return method;
};

const findByExtremeWeahter = async ({ extremeWeather }) => {
  const method = await MethodModel.findOne({ extremeWeather });
  return method;
};

const update = async ({ extremeWeather, newWeather }) => {
  const method = await MethodModel.findOneAndUpdate({ extremeWeather }, newWeather, { new: true });
  return method;
};

module.exports = { create, findByTemp, findByExtremeWeahter, update };
