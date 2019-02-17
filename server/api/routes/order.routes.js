const router = require('express').Router();
const controller = require('../controllers/order.controller');


router.route('/')
  .post(controller.createOrder);

module.exports = router;
