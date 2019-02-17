/* eslint-disable consistent-return */
import validator from 'validator';

/**
 * @NOTE all validators in this file should be in following format
 * (value, allValues, props, name) => error
 *
 * @param {any} value
 * @param {Object} allValues
 * @param {Object} props
 * @param {string} name
 * @returns {string} error message
 */

export function isDate(value) {
  if (value && value.isValid && !value.isValid()) {
    return 'Invalid Date';
  }
}

export function isRequired(value) {
  if (value === null || value === undefined || value === '') {
    return 'This field is required';
  }
}

export function isEmail(value) {
  if (!validator.isEmail(value)) {
    return 'Invalid email format';
  }
}

export function isPhone(value) {
  if (!validator.isMobilePhone(value, 'en-US')) {
    return 'Invalid phone number';
  }
}

export function isZipcode(value) {
  if (!value) {
    return;
  }
  if (!validator.isInt(value, { min: 10000, max: 99999 })) {
    return 'Invalid zipcode';
  }
}

export function isCreditCard(value) {
  if (!validator.isCreditCard(value)) {
    return 'Invalid credit card number';
  }
}

export function isCvv(value) {
  if (!validator.isInt(value, { min: 100, max: 999 })) {
    return 'Invalid CVV';
  }
}

export function isMatchingPattern(value, allValues, props) {
  const re = new RegExp(props.pattern);

  if (!re.test(value)) {
    return 'Invalid field';
  }
}

export function isNumeric(value) {
  const re = /^[-0-9.]*$/;
  if (!re.test(`${value}`)) {
    return 'Invalid number';
  }
}

export function isExperienceYears(value) {
  const re = /^[1-9][0-9]?$/;
  if (!re.test(value)) {
    return 'Invalid Years';
  }
}

export function isUrl(value) {
  if (!validator.isURL(value)) {
    return 'Invalid URL format';
  }
}

export function isMM(value) {
  const re = /^(1[0-2])|(0[0-9])$/;
  if (!re.test(value)) {
    return 'Invalid month';
  }
}

export function isYY(value) {
  const re = /^[1-3][0-9]$/;
  if (!re.test(value)) {
    return 'Invalid year';
  }
}

export function isYYYY(value) {
  if (value > 2050 || value < 1900) {
    return 'Invalid year';
  }
}

export function isDD(value) {
  const re = /^([0-2][0-9])|(3[0-1])$/;
  if (!re.test(value)) {
    return 'Invalid day';
  }
}

export function isTrue(value) {
  if (value !== true) {
    return 'Require check';
  }
}

export function isPasswordMatch(value, allValues) {
  const otherValue = allValues.get('password_confirmation');

  if (value !== otherValue) {
    return 'Passwords do not match';
  }
}

export function isRepetitiveDate(value, allValues) {
  const dates = [
    allValues.get('date_1'),
    allValues.get('date_2'),
    allValues.get('date_3'),
    allValues.get('date_4'),
  ];

  const filteredDates = dates.filter((d) => value === d);

  if (value && filteredDates.length > 1) {
    return 'Repetitive dates are not allowed';
  }
}
