const router = require('express').Router();
const controller = require('../controllers/doctor.controller');

router.route('/')
  .get(controller.getDoctors)
  .post(controller.getDoctorsPost);

router.route('/preferred')
  .get(controller.getPreferredDoctors);

router.route('/autocomplete')
  .get(controller.getAutoComplete);

router.route('/search')
  .get(controller.getDoctorsSearchByKeyword);

module.exports = router;
