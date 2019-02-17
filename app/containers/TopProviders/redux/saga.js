import { fork, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import * as CONSTANTS from './constants';
import {
  topProvidersSuccess,
  topProvidersError,
} from './actions';

// @TODO change endpoint to retrieve top providers
export function* topProvidersRequest() {
  try {
    const data = yield call(request, 'doctors/preferred?limit=4', 'GET', null, true);
    yield put(topProvidersSuccess(data.providers));
  } catch (err) {
    yield put(topProvidersError(err));
  }
}

export default [
  fork(takeLatest, CONSTANTS.TOP_PROVIDERS_REQUEST, topProvidersRequest),
];
