import * as CONSTANTS from './constants';

export function topProvidersRequest() {
  return {
    type: CONSTANTS.TOP_PROVIDERS_REQUEST,
  };
}

export function topProvidersSuccess(data) {
  return {
    type: CONSTANTS.TOP_PROVIDERS_SUCCESS,
    data,
  };
}

export function topProvidersError(error) {
  return {
    type: CONSTANTS.TOP_PROVIDERS_ERROR,
    error,
  };
}
