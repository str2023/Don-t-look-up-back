const ActivityModel = require('../schemas/activity');

const create = async ({ newActivity }) => {
  const created = await ActivityModel.create(newActivity);
  return created;
};

const findAllByAddressName = async ({ temp, wx, area }) => {
  const activities = await ActivityModel.findOne({
    temp,
    wx,
    activity: {
      $elemMatch: { location: { $elemMatch: { addressName: area } } },
    },
  }).select('activity');
  return activities;
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

const recommendActivity = async ({ _id, updateActivity }) => {
  const addressName = updateActivity.location[0].addressName;
  const userId = updateActivity.location[0].user[0].userId;
  const { name } = updateActivity;
  const query = {
    $push: {
      'activity.$[i].location.$[j].user': { userId },
    },
  };
  const option = {
    new: true,
    arrayFilters: [{ 'i.name': name }, { 'j.addressName': addressName }],
  };

  const recommended = await ActivityModel.findOneAndUpdate({ _id }, query, option);
  return recommended;
};

module.exports = { create, findAllByAddressName, findLocationByActivity, addActivity, recommendActivity };
