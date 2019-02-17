const firebase = require('../config/firebase');
const { uid } = require('rand-token');
const moment = require('moment');
const { filters } = require('../lib');

module.exports = {
  processPartnerRequest(req) {
    return new Promise((resolve, reject) => {
      if (!req) {
        reject(new Error('Data was not provided'));
      }
      try { // try / catch block used to test for body errors
        const claimObject = {
          uuid: uid(16),
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          type: '',
          address: '',
          city: '',
          state: '',
          zipcode: '',
          specialty: '',
          clinicGroup: '',
          website: '',
          timestamp: moment().unix(),
        };
        let valid = true;
        // check for required fields
        const required = filters.partnerRequestPayloadRequired(req.body);
        if (required.error) {
          reject(required.message);
          valid = false;
        }
        // filter each form field against data type, format and whitelist
        Object.keys(req.body).forEach((k) => {
          if (req.body[k].length > 0) {
            const filter = filters.partnerRequestPayloadFilter(k, req.body[k]);
            if (filter.error) {
              reject(filter.message);
              valid = false;
            }
            claimObject[k] = req.body[k];
          }
        });
        if (valid) {
          firebase.databaseRef.ref('partners').push(claimObject, (error) => {
            if (error) {
              reject(error);
            }
          })
            .then(() => {
              resolve({ result: claimObject });
            });
        }
      } catch (e) {
        reject(e);
      }
    });
  },
};
