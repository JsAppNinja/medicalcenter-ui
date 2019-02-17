const _ = require('underscore');
const validator = require('validator');
const reExpireDate = /^(?:0?[1-9]|1[0-2]) *\/ *[1-9][0-9]$/;
const reStreetAddress = /[^-.?!,;:() A-Za-z0-9]/;
const reCharTest = /[^-.?!,;:<>@() A-Za-z0-9]/;
const cartFields = {
  consultDateOne: 'date',
  consultDateTwo: 'date',
  consultDateThree: 'date',
  consultDateFour: 'date',
  zipcode: 'zip',
  firstName: 'name',
  lastName: 'name',
  email: 'email',
  phone: 'phone',
  dob: 'date',
  billingAddress: 'address',
  billingZipcode: 'zip',
  total: 'float',
  terms: 'bool',
  hipaa: 'bool',
};
const cartRequiredFields = [
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
  'cardToken',
  'billingAddress',
  'billingZipcode',
  'total',
  'terms',
  'hipaa',
];
const claimFields = {
  profileId: '', // this is default
  userId: '', // this is default
  firstName: 'name',
  lastName: 'name',
  email: 'email',
  phone: 'phone',
};
const claimRequiredFields = [
  'profileId',
  'userId',
  'firstName',
  'lastName',
  'email',
  'phone',
];
const partnerRequestFields = {
  firstName: 'name',
  lastName: 'name',
  email: 'email',
  phone: 'phone',
  type: 'alpha',
  address: 'address',
  city: 'alpha',
  state: 'alpha',
  zipcode: 'zip',
  specialty: 'alpha',
  clinicGroup: 'alpha',
  website: 'illegalChar',
};
const partnerRequestRequiredFields = [
  'firstName',
  'lastName',
  'email',
  'phone',
];
const sendEmailRequestFields = {
  from: 'illegalChar',
  to: 'email',
  subject: 'illegalChar',
  template: 'alphaNum',
  messageData: 'object',
  text: 'illegalChar',
};
const sendEmailRequiredFields = [
  'to',
  'subject',
];

function validateField(vInst, val) {
  let fieldValid = true;
  let test = false;

  switch (vInst) {
    case 'date':
      if (val.length > 0) {
        test = validator.isISO8601(val);
        if (!test) { fieldValid = false; }
      }
      break;
    case 'email':
      test = validator.isEmail(val);
      if (!test) { fieldValid = false; }
      break;
    case 'phone':
      test = validator.isMobilePhone(val, 'en-US');
      if (!test) { fieldValid = false; }
      break;
    case 'name':
      test = validator.isAlpha(val, 'en-US');
      if (!test) { fieldValid = false; }
      break;
    case 'address':
      // test for illegal characters
      test = reStreetAddress.test(val);
      if (test) { fieldValid = false; }
      break;
    case 'zip':
      test = validator.isInt(val, { min: 10000, max: 99999 });
      if (!test) { fieldValid = false; }
      break;
    case 'cc':
      test = validator.isCreditCard(val);
      if (!test) { fieldValid = false; }
      break;
    case 'cvv':
      test = validator.isInt(val, { min: 100, max: 999 });
      if (!test) { fieldValid = false; }
      break;
    case 'float':
      test = validator.isFloat(val, { min: 100.00, max: 10000.00, locale: 'en-US' });
      if (!test) { fieldValid = false; }
      break;
    case 'bool':
      test = validator.isBoolean(val);
      if (!test) { fieldValid = false; }
      break;
    case 'expire':
      test = reExpireDate.test(val);
      if (!test) { fieldValid = false; }
      break;
    case 'alpha':
      test = validator.isAlpha(val, 'en-US');
      if (!test) { fieldValid = false; }
      break;
    case 'alphaNum':
      test = validator.isAlphanumeric(val, 'en-US');
      if (!test) { fieldValid = false; }
      break;
    case 'illegalChar':
      // test for illegal characters
      test = reCharTest.test(val);
      if (test) { fieldValid = false; }
      break;
    case 'object':
      // test for object
      if (typeof val !== 'object') { fieldValid = false; }
      break;
    default:
      test = validator.isAlphanumeric(val, 'en-US');
      if (!test) { fieldValid = false; }
  }
  return fieldValid;
}

module.exports = {
  orderPayloadFilter(key, val) {
    try {
      const resp = {
        error: false,
        message: 'no error',
      };
      if (typeof val !== 'string') {
        resp.error = true;
        resp.message = 'all values must be strings';
        return resp;
      }

      const vInst = cartFields[key];
      let fieldValid = true;
      let test = false;

      switch (vInst) {
        case 'date':
          if (val.length > 0) {
            test = validator.isISO8601(val);
            if (!test) { fieldValid = false; }
          }
          break;
        case 'email':
          test = validator.isEmail(val);
          if (!test) { fieldValid = false; }
          break;
        case 'phone':
          test = validator.isMobilePhone(val, 'en-US');
          if (!test) { fieldValid = false; }
          break;
        case 'name':
          test = validator.isAlpha(val, 'en-US');
          if (!test) { fieldValid = false; }
          break;
        case 'address':
          // test for illegal characters
          test = reStreetAddress.test(val);
          if (test) { fieldValid = false; }
          break;
        case 'zip':
          test = validator.isInt(val, { min: 10000, max: 99999 });
          if (!test) { fieldValid = false; }
          break;
        case 'cc':
          test = validator.isCreditCard(val);
          if (!test) { fieldValid = false; }
          break;
        case 'cvv':
          test = validator.isInt(val, { min: 100, max: 999 });
          if (!test) { fieldValid = false; }
          break;
        case 'float':
          test = validator.isFloat(val, { min: 100.00, max: 10000.00, locale: 'en-US' });
          if (!test) {
            resp.error = true;
            resp.message = `${key} field invalid or value is incorrect`;
          }
          break;
        case 'bool':
          test = validator.isBoolean(val);
          if (!test) { fieldValid = false; }
          break;
        case 'expire':
          test = reExpireDate.test(val);
          if (!test) { fieldValid = false; }
          break;
        default:
          // test = validator.isAlphanumeric(val, 'en-US');
          // if (!test) { fieldValid = false; }
      }

      if (!fieldValid) {
        resp.error = true;
        resp.message = `${key} field invalid`;
      }

      return resp;
    } catch (e) {
      return {
        error: true,
        message: 'general validation error',
      };
    }
  },
  orderPayloadRequired(req) {
    try {
      const resp = {
        error: false,
        message: 'no error',
      };
      const keys = Object.keys(req);
      const diff = _.difference(cartRequiredFields, keys);
      if (diff.length !== 0) {
        resp.error = true;
        resp.message = `missing required fields - ${diff}`;
        return resp;
      }
      return resp;
    } catch (e) {
      return {
        error: true,
        message: 'general required field error',
      };
    }
  },
  claimProfilePayloadFilter(key, val) {
    try {
      const resp = {
        error: false,
        message: 'no error',
      };
      if (typeof val !== 'string') {
        resp.error = true;
        resp.message = 'all values must be strings';
        return resp;
      }
      if (!(key in claimFields)) {
        resp.error = true;
        resp.message = 'form field invalid';
        return resp;
      }

      const vInst = claimFields[key];
      const validate = validateField(vInst, val);
      if (!validate) {
        resp.error = true;
        resp.message = `${key} field invalid`;
      }

      return resp;
    } catch (e) {
      return {
        error: true,
        message: 'general validation error',
      };
    }
  },
  claimProfilePayloadRequired(req) {
    try {
      const resp = {
        error: false,
        message: 'no error',
      };
      const keys = Object.keys(req);
      const diff = _.difference(claimRequiredFields, keys);
      if (diff.length !== 0) {
        resp.error = true;
        resp.message = `missing required fields - ${diff}`;
        return resp;
      }
      return resp;
    } catch (e) {
      return {
        error: true,
        message: 'general required field error',
      };
    }
  },
  partnerRequestPayloadFilter(key, val) {
    try {
      const resp = {
        error: false,
        message: 'no error',
      };
      if (typeof val !== 'string') {
        resp.error = true;
        resp.message = 'all values must be strings';
        return resp;
      }
      if (!(key in partnerRequestFields)) {
        resp.error = true;
        resp.message = 'form field invalid';
        return resp;
      }

      const vInst = partnerRequestFields[key];
      const validate = validateField(vInst, val);
      if (!validate) {
        resp.error = true;
        resp.message = `${key} field invalid`;
      }

      return resp;
    } catch (e) {
      return {
        error: true,
        message: 'general validation error',
      };
    }
  },
  partnerRequestPayloadRequired(req) {
    try {
      const resp = {
        error: false,
        message: 'no error',
      };
      const keys = Object.keys(req);
      const diff = _.difference(partnerRequestRequiredFields, keys);
      if (diff.length !== 0) {
        resp.error = true;
        resp.message = `missing required fields - ${diff}`;
        return resp;
      }
      return resp;
    } catch (e) {
      return {
        error: true,
        message: 'general required field error',
      };
    }
  },
  sendEmailPayloadFilter(key, val) {
    try {
      const resp = {
        error: false,
        message: 'no error',
      };

      if (typeof val !== 'string' && typeof val !== 'object') {
        resp.error = true;
        resp.message = 'all values must be strings';
        return resp;
      }

      if (!(key in sendEmailRequestFields)) {
        resp.error = true;
        resp.message = 'form field invalid';
        return resp;
      }

      const vInst = sendEmailRequestFields[key];
      const validate = validateField(vInst, val);
      if (!validate) {
        resp.error = true;
        resp.message = `${key} field invalid`;
      }

      return resp;
    } catch (e) {
      return {
        error: true,
        message: 'general validation error',
      };
    }
  },
  sendEmailPayloadRequired(req) {
    try {
      const resp = {
        error: false,
        message: 'no error',
      };
      const keys = Object.keys(req);
      const diff = _.difference(sendEmailRequiredFields, keys);
      if (diff.length !== 0) {
        resp.error = true;
        resp.message = `missing required fields - ${diff}`;
        return resp;
      }
      return resp;
    } catch (e) {
      return {
        error: true,
        message: 'general required field error',
      };
    }
  },
};
