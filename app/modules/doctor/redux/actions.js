import * as CONSTANTS from './constants';

export function doctorProfileRequest(id) {
  return {
    type: CONSTANTS.DOCTOR_PROFILE_REQUEST,
    id,
  };
}

export function doctorProfileSuccess(data) {
  return {
    type: CONSTANTS.DOCTOR_PROFILE_SUCCESS,
    data,
  };
}

export function doctorProfileError(error) {
  return {
    type: CONSTANTS.DOCTOR_PROFILE_ERROR,
    error,
  };
}

export function toggleSocialModal(show = true, videoIndex) {
  return {
    type: CONSTANTS.DOCTOR_SOCIAL_MODAL_TOGGLE,
    show,
    videoIndex,
  };
}

export function toggleClaim(claimed) {
  return {
    type: CONSTANTS.DOCTOR_CLAIM_TOGGLE,
    claimed,
  };
}
