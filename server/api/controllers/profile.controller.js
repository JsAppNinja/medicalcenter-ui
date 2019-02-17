const api = require('../src/profile');

function claimProfile(req, res) {
  const promise = api.processClaimProfile(req);
  promise
    .then((v) => {
      res.json(v);
    })
    .catch((e) => {
      res.status(400).send({ message: e && e.message ? e.message : e });
    });
}

module.exports = {
  claimProfile,
};
