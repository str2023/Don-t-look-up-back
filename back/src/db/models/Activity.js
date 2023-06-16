const ActivityModel = require('../schemas/activity');

const create = async ({ newActivity }) => {
  const created = await ActivityModel.create(newActivity);
  return created;
};

const findAllByAddressName = async ({ temp, wx, area }) => {
  const allActivities = await ActivityModel.findOne({
    temp: { $in: temp },
    wx,
  }).select('activity');

  const activitiesInArea = await ActivityModel.findOne({
    temp: { $in: temp },
    wx,
    'activity.location': { $elemMatch: { addressName: area } },
  }).select('activity');
  return { allActivities, activitiesInArea };
};

const findLocationByActivity = async ({ activity }) => {
  const allAddresses = await ActivityModel.find({ activity: { $in: { name: activity } } });
  return allAddresses;
};

const addActivity = async ({ _id, updateActivity }) => {
  const query = {
    $push: {
      activity: updateActivity,
    },
  };

  const updated = await ActivityModel.findOneAndUpdate({ _id }, query, { new: true });

  return updated;
};

const addLocation = async ({ _id, updateActivity }) => {
  const { name, location } = updateActivity;
  const query = {
    $push: { 'activity.$[i].location': location[0] },
  };
  const option = {
    new: true,
    arrayFilters: [{ 'i.name': name }],
  };

  const updated = await ActivityModel.findOneAndUpdate({ _id }, query, option);

  return updated;
};

const recommendActivity = async ({ _id, updateActivity }) => {
  const { addressName } = updateActivity.location[0];
  const { userId } = updateActivity.location[0].user[0];
  const { name } = updateActivity;
  const query = {
    $push: { 'activity.$[i].location.$[j].user': { userId } },
    $inc: { 'activity.$[i].location.$[j].count': 1 },
  };
  const option = {
    new: true,
    arrayFilters: [{ 'i.name': name }, { 'j.addressName': addressName }],
  };

  const recommended = await ActivityModel.findOneAndUpdate({ _id }, query, option);
  return recommended;
};

module.exports = { create, findAllByAddressName, findLocationByActivity, addActivity, addLocation, recommendActivity };
