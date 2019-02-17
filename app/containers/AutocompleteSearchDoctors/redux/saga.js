import { fork, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import * as CONSTANTS from './constants';
import {
  keywordsGetSuccess,
  keywordsGetError,
} from './actions';

export function* keywordsGetRequest() {
  try {
    const data = yield call(request, 'doctors/autocomplete', 'GET', null, true);
    const options = data.keywords
      .filter((k) => k)
      .map((k) => ({
        label: k,
        value: k,
      }));
    yield put(keywordsGetSuccess(options));
  } catch (err) {
    yield put(keywordsGetError(err));
  }
}

export default [
  fork(takeLatest, CONSTANTS.KEYWORDS_GET_REQUEST, keywordsGetRequest),
];
