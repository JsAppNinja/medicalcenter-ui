const router = require('express').Router();
const controller = require('../controllers/doctor.controller');

router.route('/')
  .post(controller.getDoctorPost);

router.route('/:uuid')
  .get(controller.getDoctor);


module.exports = router;
