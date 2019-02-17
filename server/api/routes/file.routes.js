const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const uniqid = require('uniqid');
const controller = require('../controllers/file.controller');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, uniqid() + path.extname(file.originalname)); // eslint-disable-line
  },
});

const upload = multer({ storage });
router.route('/:type')
  .post(upload.single('file'), controller.upload);

module.exports = router;
