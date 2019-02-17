import * as CONSTANTS from './constants';

export function packagesFilterRequest(searchOptions, isResetSearch = true, filterName = '') {
  return {
    type: CONSTANTS.CARE_PACKAGES_FILTER_REQUEST,
    searchOptions,
    isResetSearch,
    filterName,
  };
}

export function packagesFilterSuccess(data, isResetSearch) {
  return {
    type: CONSTANTS.CARE_PACKAGES_FILTER_SUCCESS,
    data,
    isResetSearch,
  };
}

export function packagesFilterError(error) {
  return {
    type: CONSTANTS.CARE_PACKAGES_FILTER_ERROR,
    error,
  };
}

export function displayFeedItemsCountSetRequest() {
  return {
    type: CONSTANTS.SET_DISPLAY_FEED_COUNT,
  };
}

export function initPackageListRequest() {
  return {
    type: CONSTANTS.INIT_PACKAGELIST_DATA,
  };
}
