import * as CONSTANTS from './constants';

export function homeDoctorSearchRequest(searchItems) {
  return {
    type: CONSTANTS.HOME_DOCTOR_SEARCH_REQUEST,
    searchItems,
  };
}

export function homeDoctorSearchSuccess(data) {
  return {
    type: CONSTANTS.HOME_DOCTOR_SEARCH_SUCCESS,
    data,
  };
}

export function homeDoctorSearchError(error) {
  return {
    type: CONSTANTS.HOME_DOCTOR_SEARCH_ERROR,
    error,
  };
}

export function homePreferredDoctorsRequest() {
  return {
    type: CONSTANTS.HOME_PREFERRED_DOCTOR_REQUEST,
  };
}

export function homePreferredDoctorsSuccess(data) {
  return {
    type: CONSTANTS.HOME_PREFERRED_DOCTOR_SUCCESS,
    data,
  };
}

export function homePreferredDoctorsError(error) {
  return {
    type: CONSTANTS.HOME_PREFERRED_DOCTOR_ERROR,
    error,
  };
}

export function homeSetHoverDoctorRequest(hoverDoctorId) {
  return {
    type: CONSTANTS.HOME_SET_HOVER_DOCTOR_REQUEST,
    hoverDoctorId,
  };
}
