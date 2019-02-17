import * as CONSTANTS from './constants';

export function keywordsGetRequest() {
  return {
    type: CONSTANTS.KEYWORDS_GET_REQUEST,
  };
}

export function keywordsGetSuccess(data) {
  return {
    type: CONSTANTS.KEYWORDS_GET_SUCCESS,
    data,
  };
}

export function keywordsGetError(error) {
  return {
    type: CONSTANTS.KEYWORDS_GET_ERROR,
    error,
  };
}
