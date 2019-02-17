const router = require('express').Router();
const controller = require('../controllers/cart.controller');

router.route('/')
  .post(controller.createCart);

router.route('/:uuid')
  .get(controller.getCart);

module.exports = router;
