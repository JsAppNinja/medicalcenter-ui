import { db } from './firebase';

// User API
export const doCreateUser = (user) =>
  db.ref(`users/${user.id}`).set(user);

export const doGetProfile = (uid) =>
  db.ref(`users/${uid}`).once('value').then((snap) => (snap).val());
