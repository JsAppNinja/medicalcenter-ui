import * as CONSTANTS from './constants';

export function contactRequest() {
  return {
    type: CONSTANTS.CONTACT_REQUEST,
  };
}

export function contactSuccess() {
  return {
    type: CONSTANTS.CONTACT_SUCCESS,
  };
}

export function contactError(error) {
  return {
    type: CONSTANTS.CONTACT_ERROR,
    error,
  };
}

export function contactReset() {
  return {
    type: CONSTANTS.CONTACT_RESET,
  };
}

export function contactCaptchaVerify(captcha) {
  return {
    type: CONSTANTS.CONTACT_CAPTCHA_VERIFY,
    captcha,
  };
}
