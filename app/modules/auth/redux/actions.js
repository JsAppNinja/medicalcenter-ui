import * as CONSTANTS from './constants';

export function authUserSet(user) {
  return {
    type: CONSTANTS.AUTH_USER_SET,
    user,
  };
}

export function authUserLoading(loading) {
  return {
    type: CONSTANTS.AUTH_USER_LOADING,
    loading,
  };
}

export function authLoginRequest() {
  return {
    type: CONSTANTS.AUTH_LOGIN_REQUEST,
  };
}

export function authSignupRequest() {
  return {
    type: CONSTANTS.AUTH_SIGNUP_REQUEST,
  };
}
