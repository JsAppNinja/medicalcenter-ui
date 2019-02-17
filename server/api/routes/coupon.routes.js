const router = require('express').Router();
const controller = require('../controllers/coupon.controller');

router.route('/verify')
  .post(controller.verifyCoupon);

module.exports = router;
