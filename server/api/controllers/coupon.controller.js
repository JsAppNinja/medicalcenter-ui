const api = require('../src/coupon');

function verifyCoupon(req, res) {
  const {
    coupon,
    doctor,
  } = req.body;

  api.verifyCoupon(doctor, coupon)
    .then((v) => {
      res.json(v);
    })
    .catch((e) => {
      res.status(400);
      res.send({ message: e.message });
    });
}

module.exports = {
  verifyCoupon,
};
