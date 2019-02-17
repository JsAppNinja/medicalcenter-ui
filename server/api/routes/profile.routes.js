const router = require('express').Router();
const controller = require('../controllers/profile.controller');

router.route('/claim')
  .post(controller.claimProfile);

module.exports = router;
