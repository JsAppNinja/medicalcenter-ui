import { fork, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import * as CONSTANTS from './constants';
import {
  servicesRecentViewedDoctorsSuccess,
  servicesRecentViewedDoctorsError,
} from './actions';

export function* servicesRecentViewedDoctorsRequest() {
  try {
    const data = yield call(request, 'doctors?limit=4', 'GET', null, true);
    yield put(servicesRecentViewedDoctorsSuccess(data.providers));
  } catch (err) {
    yield put(servicesRecentViewedDoctorsError(err));
  }
}

export default [
  fork(takeLatest, CONSTANTS.SERVICES_RECENT_VIEWED_DOCTORS_REQUEST, servicesRecentViewedDoctorsRequest),
];
