const router = require('express').Router();
const controller = require('../controllers/partner.controller');

router.route('/request')
  .post(controller.createPartner);

module.exports = router;
