import * as CONSTANTS from './constants';

export function showLoginModal() {
  return {
    type: CONSTANTS.LOGIN_MODAL_SHOW,
  };
}

export function hideLoginModal() {
  return {
    type: CONSTANTS.LOGIN_MODAL_HIDE,
  };
}
