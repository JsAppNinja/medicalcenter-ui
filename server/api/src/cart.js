const firebase = require('../config/firebase');
const moment = require('moment');

module.exports = {
  getShoppingCart(payload) {
    return new Promise((resolve, reject) => {
      const { uuid } = payload;
      if (uuid === undefined || uuid === null) {
        reject(new Error('Data was not provided'));
      }
      try {
        firebase.databaseRef.ref(`cart/${uuid}`)
          .once('value', (snapshot) => {
            const snap = snapshot.val();
            if (snap === null) {
              reject(new Error('No Record found'));
            } else {
              resolve({ result: snapshot.val() });
            }
          }, (errorObject) => {
            reject(errorObject);
          });
      } catch (e) {
        reject(e);
      }
    });
  },
  updateShoppingCart(req) {
    return new Promise((resolve, reject) => {
      if (!req) {
        reject(new Error('Data was not provided'));
      }
      const whiteListed = [
        'consultDateOne',
        'consultDateTwo',
        'consultDateThree',
        'consultDateFour',
        'zipcode',
        'firstName',
        'lastName',
        'email',
        'phone',
        'dob',
        'billingAddress',
        'billingZipcode',
        'terms',
        'hipaa',
      ];
      try { // try / catch block used to test for body errors
        const cartObject = {
          consultDateOne: '',
          consultDateTwo: '',
          consultDateThree: '',
          consultDateFour: '',
          zipcode: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dob: '',
          billingAddress: '',
          billingZipcode: '',
          terms: 0,
          hipaa: 0,
          timestamp: moment().unix(),
        };
        const { uuid } = req.body;
        Object.keys(req.body).forEach((k) => {
          if (whiteListed.indexOf(k) > -1) {
            cartObject[k] = req.body[k];
          }
        });
        if (uuid === null || uuid === undefined) {
          firebase.databaseRef.ref('cart').push(cartObject, (error) => {
            if (error) {
              reject(error);
            }
          })
            .then((resp) => {
              resolve({ result: resp.key });
            });
        } else {
          firebase.databaseRef.ref(`cart/${uuid}`).update(cartObject, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve({ result: true });
            }
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  },
};
