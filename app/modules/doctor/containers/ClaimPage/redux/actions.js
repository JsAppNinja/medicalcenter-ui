import * as CONSTANTS from './constants';

export function claimProfileRequest(doctorID) {
  return {
    type: CONSTANTS.CLAIM_PROFILE_REQUEST,
    doctorID,
  };
}

export function claimProfileSuccess(data) {
  return {
    type: CONSTANTS.CLAIM_PROFILE_SUCCESS,
    data,
  };
}

export function claimProfileError(error) {
  return {
    type: CONSTANTS.CLAIM_PROFILE_ERROR,
    error,
  };
}
