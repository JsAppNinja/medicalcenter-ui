import * as CONSTANTS from './constants';

export function showSignupModal() {
  return {
    type: CONSTANTS.SIGNUP_MODAL_SHOW,
  };
}

export function hideSignupModal() {
  return {
    type: CONSTANTS.SIGNUP_MODAL_HIDE,
  };
}
