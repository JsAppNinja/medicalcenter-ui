const firebase = require('../config/firebase');
const moment = require('moment');
const { filters } = require('../lib');
const mailService = require('./email');

function isAvailableForClaim(profileId) {
  return firebase.databaseRef
    .ref()
    .child('profiles^users')
    .child(profileId)
    .once('value')
    .then((snap) => {
      if (snap.val()) {
        throw new Error('Profile already claimed');
      }
    });
}

function validateUserObject(reqObject) {
  // check for required fields
  const required = filters.claimProfilePayloadRequired(reqObject);

  if (required.error) {
    return Promise.reject(required.message);
  }

  const userObject = {
    userId: '',
    profileId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timestamp: moment().unix(),
  };
  let errorMsg = null;

  // check for filter
  Object.keys(reqObject).every((k) => {
    const filter = filters.claimProfilePayloadFilter(k, reqObject[k]);

    if (filter.error) {
      errorMsg = filter.message;
      return false;
    }

    userObject[k] = reqObject[k];
    return true;
  });

  if (errorMsg) {
    return Promise.reject(errorMsg);
  }

  return Promise.resolve(userObject);
}

function propagate(userObject) {
  const { userId, profileId } = userObject;
  const updates = {
    [`profiles^users/${profileId}`]: userId,
    [`users^profiles/${userId}`]: profileId,
    [`users/${userId}`]: userObject,
  };

  return firebase.databaseRef.ref().update(updates).then(() => userObject);
}

function processClaimProfile(req) {
  if (!req || !req.body) {
    return Promise.reject(new Error('Data was not provided'));
  }

  const { password, ...reqBody } = req.body;

  return isAvailableForClaim(reqBody.profileId)
    .then(() => validateUserObject(reqBody))
    .then((userObject) => propagate(userObject))
    .then((userObject) => {
      // asynchronously sends email
      mailService.sendEmail({
        to: process.env.CONTACT_EMAIL,
        subject: `New Profile Claim for ${userObject.firstName} ${userObject.lastName}`,
        text: [
          `Name: ${userObject.firstName} ${userObject.lastName}`,
          `Email: ${userObject.email}`,
          `ProfileId: ${userObject.profileId}`,
          `Phone: ${userObject.phone}`,
          `Time: ${moment().format('LLLL')}`,
        ].join('\n'),
      });

      mailService.sendEmail({
        to: userObject.email,
        subject: 'Thanks for claiming your profile',
        text: `Your profile has been claimed and account was created. Your password is "${password}".`,
      });

      return { result: userObject };
    });
}

module.exports = {
  processClaimProfile,
};
