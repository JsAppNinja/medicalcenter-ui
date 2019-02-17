const api = require('../src/email');

function sendEmail(req, res) {
  const promise = api.sendEmail(req.body);
  promise
    .then((v) => {
      res.json(v);
    })
    .catch((e) => {
      res.status(400);
      res.send({ message: e });
    });
}

module.exports = {
  sendEmail,
};
