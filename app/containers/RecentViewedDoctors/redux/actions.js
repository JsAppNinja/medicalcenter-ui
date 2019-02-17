import * as CONSTANTS from './constants';

export function servicesRecentViewedDoctorsRequest() {
  return {
    type: CONSTANTS.SERVICES_RECENT_VIEWED_DOCTORS_REQUEST,
  };
}

export function servicesRecentViewedDoctorsSuccess(data) {
  return {
    type: CONSTANTS.SERVICES_RECENT_VIEWED_DOCTORS_SUCCESS,
    data,
  };
}

export function servicesRecentViewedDoctorsError(error) {
  return {
    type: CONSTANTS.SERVICES_RECENT_VIEWED_DOCTORS_ERROR,
    error,
  };
}
