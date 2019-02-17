const api = require('../src/file');

function upload(req, res) {
  api.upload(req.file, req.query.doctorID, req.params.type)
    .then((v) => {
      res.json(v);
    })
    .catch((e) => {
      console.error(e); // eslint-disable-line
      res.status(400);
      res.send({ message: e });
    });
}

module.exports = {
  upload,
};
