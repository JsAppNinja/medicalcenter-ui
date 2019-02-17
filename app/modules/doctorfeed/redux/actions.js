import * as CONSTANTS from './constants';

export function doctorFeedSearchRequest(
  searchOptions,
  isResetSearch = true,
  isPackageDoctorSearch = false,
  packageName,
) {
  return {
    type: CONSTANTS.FEED_DOCTOR_SEARCH_REQUEST,
    searchOptions,
    isResetSearch,
    isPackageDoctorSearch,
    packageName,
  };
}

export function doctorFeedSearchSuccess(data, isResetSearch, isPackageDoctorSearch) {
  return {
    type: CONSTANTS.FEED_DOCTOR_SEARCH_SUCCESS,
    data,
    isResetSearch,
    isPackageDoctorSearch,
  };
}

export function doctorFeedSearchError(error) {
  return {
    type: CONSTANTS.FEED_DOCTOR_SEARCH_ERROR,
    error,
  };
}

export function displayFeedItemsCountSetRequest() {
  return {
    type: CONSTANTS.SET_DISPLAY_FEED_COUNT,
  };
}

export function initDoctorListRequest() {
  return {
    type: CONSTANTS.INIT_DOCTORLIST_DATA,
  };
}
