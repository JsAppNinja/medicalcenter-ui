const router = require('express').Router();
const controller = require('../controllers/contact.controller');

router.route('/')
  .post(controller.createContactRequest);

module.exports = router;
