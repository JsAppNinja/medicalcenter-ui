const router = require('express').Router();
const controller = require('../controllers/package.controller');

router.route('/')
  .get(controller.getPackages);

module.exports = router;
