const api = require('../src/contact');

function createContactRequest(req, res) {
  const promise = api.processContactRequest(req.body);
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
  createContactRequest,
};
