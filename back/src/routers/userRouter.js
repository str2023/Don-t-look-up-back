const router = require('express').Router();
const userSearch = require('../services/userService');

router.get('/', async (req, res, next) => {
  const users = await userSearch();
  res.status(200).send(users);
});

module.exports = router;
