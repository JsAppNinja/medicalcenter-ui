const api = require('../src/order');

function createOrder(req, res) {
  const promise = api.processOrder(req);
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
  createOrder,
};
