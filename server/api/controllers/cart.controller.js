const api = require('../src/cart');

function getCart(req, res) {
  const { uuid } = req.params;
  const promise = api.getShoppingCart({ uuid });
  promise
    .then((v) => {
      res.json(v);
    })
    .catch(() => {
      res.status(404);
      res.send({ result: false });
    });
}

function createCart(req, res) {
  const promise = api.updateShoppingCart(req);
  promise
    .then((v) => {
      res.json(v);
    })
    .catch(() => {
      res.status(400);
      res.send({ result: false });
    });
}

module.exports = {
  getCart,
  createCart,
};
