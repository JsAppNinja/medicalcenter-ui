const firebase = require('firebase');
const config = require('../../config');

const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
  databaseURL: config.firebaseDatabaseURL,
  projectId: config.firebaseProjectId,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMessagingSenderId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const databaseRef = firebase.database();
const authRef = firebase.auth();

module.exports = {
  databaseRef,
  authRef,
};
