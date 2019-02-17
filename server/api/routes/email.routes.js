const router = require('express').Router();
const controller = require('../controllers/email.controller');

router.route('/send')
  .post(controller.sendEmail);

module.exports = router;
