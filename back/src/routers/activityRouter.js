const activityRouter = require('express').Router();
const loginRequired = require('../middlewares/loginRequired');
const activityService = require('../services/activityService');
const asyncHandler = require('../utils/asyncHandler');

activityRouter.get(
  '/activity',
  asyncHandler(async (req, res, next) => {
    const { temp, wx, area } = req.query;
    const { activities, tryActivities, errorMessage } = await activityService.getActivity({ temp, wx, area });

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
  asyncHandler(async (req, res, next) => {
    const { temp, wx, area, activity } = req.body;
    const userId = req.currentUserId;

    const activities = await activityService.createActivity({ temp, wx, area, activity, userId });

    if (activities?.errorMessage) {
      res.status(404).send(activities.errorMessage);
      return;
    }

    res.status(200).send(activities);
  }),
);

module.exports = activityRouter;
