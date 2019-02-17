const router = require('express').Router();
const controller = require('../controllers/wishlist.controller');

router.route('/')
  .post(controller.createWishlist);

router.route('/:sessionId')
  .post(controller.addToWishlist)
  .get(controller.getWishlist);

router.route('/:sessionId/:doctorID')
  .delete(controller.removeFromWishlist);

module.exports = router;
