const firebase = require('../config/firebase');

function _getRef() {
  return firebase.databaseRef.ref('wishlist');
}

/**
 * generates session and return key
 * @returns {String}
 */
function generateSession() {
  const newRef = _getRef().push();
  return newRef.key;
}

/**
 * Returns wishlist for the session id
 * @param {String} sessionId
 * @returns {Promise<Object>}
 */
function getWishlist(sessionId) {
  return _getRef()
    .child(sessionId)
    .once('value')
    .then((snap) => snap.val());
}

/**
 * accepts doctor object and save for the session
 * @param {String} sessionId
 * @param {Object} doctor Doctor object
 * @returns {Promise<Object>} added item
 */
function addToWishlist(sessionId, doctor) {
  // FIXME accept only doctor ID
  return _getRef()
    .child(sessionId)
    .child(doctor.uuid)
    .set(doctor);
}

/**
 * removes doctor from wishlist
 * @param {String} sessionId
 * @param {String} doctorID
 */
function removeFromWishlist(sessionId, doctorID) {
  return _getRef()
    .child(sessionId)
    .child(doctorID)
    .set(null);
}

module.exports = {
  generateSession,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
