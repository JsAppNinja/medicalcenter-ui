const api = require('../src/partner');

function createPartner(req, res) {
  const promise = api.processPartnerRequest(req);
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
  createPartner,
};
