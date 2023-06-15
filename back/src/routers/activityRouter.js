const activityRouter = require('express').Router();
const loginRequired = require('../middlewares/loginRequired');
const activityService = require('../services/activityService');
const asyncHandler = require('../utils/asyncHandler');
const getArea = require('../middlewares/getArea');

activityRouter.get(
  '/activity',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { temp, wx } = req.query;
    const { Area } = req.AreaInfo;
    const { activities, tryActivities, errorMessage } = await activityService.getActivity({ temp, wx, area: Area.si });

    if (errorMessage) {
      res.status(404).send(errorMessage);
      return;
    }

    res.status(200).send({ activities, tryActivities });
  }),
);

activityRouter.post(
  '/activity',
  loginRequired,
  getArea,
  asyncHandler(async (req, res, next) => {
    const { temp, wx, activity } = req.body;
    const { Area } = req.AreaInfo;
    const userId = req.currentUserId;

    const activities = await activityService.createActivity({ temp, wx, area: Area.si, activity, userId });

    if (activities?.errorMessage) {
      res.status(404).send(activities.errorMessage);
      return;
    }

    res.status(200).send(activities);
  }),
);

module.exports = activityRouter;
