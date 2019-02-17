const api = require('../src/onboarding');

function onboardDoctor(req, res) {
  const promise = api.updateDoctor(req.params.doctorID, req.body);
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
  onboardDoctor,
};
