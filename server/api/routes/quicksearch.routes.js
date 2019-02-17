const router = require('express').Router();
const controller = require('../controllers/quicksearch.controller');

router.route('/')
  .get(controller.getQuickSearch);

module.exports = router;
