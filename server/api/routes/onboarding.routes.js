const router = require('express').Router();
const controller = require('../controllers/onboarding.controller');

router.route('/:doctorID')
  .post(controller.onboardDoctor);

module.exports = router;
