const router = require('express').Router();
const controller = require('../controllers/package.controller');

router.route('/:name')
  .get(controller.getPackage);

module.exports = router;
