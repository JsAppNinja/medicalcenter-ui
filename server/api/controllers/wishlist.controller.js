const wishlist = require('../src/wishlist');

function createWishlist(req, res) {
  const sessionId = wishlist.generateSession();
  res.json({ sessionId });
}

function getWishlist(req, res) {
  const { sessionId } = req.params;
  wishlist.getWishlist(sessionId)
    .then((data) => {
      res.json(data);
    });
}

function addToWishlist(req, res) {
  const { sessionId } = req.params;
  const doctor = req.body;
  wishlist.addToWishlist(sessionId, doctor)
    .then((response) => {
      res.json(response);
    });
}

function removeFromWishlist(req, res) {
  const { sessionId, doctorId } = req.params;
  wishlist.removeFromWishlist(sessionId, doctorId)
    .then((response) => {
      res.json(response);
    });
}

module.exports = {
  createWishlist,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
