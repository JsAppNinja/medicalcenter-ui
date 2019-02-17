import { fork, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import qs from 'qs';

import * as CONSTANTS from './constants';
import {
  homeDoctorSearchSuccess,
  homeDoctorSearchError,
  homePreferredDoctorsSuccess,
  homePreferredDoctorsError,
} from './actions';

export function* homeDoctorSearchRequest(action) {
  const {
    joint,
    zip,
    radius,
  } = action.searchItems;
  const limit = 100;
  let reqUrl;

  if (!joint && !zip) {
    reqUrl = 'doctors?show_on_home=1';
  } else {
    const queryStr = qs.stringify({
      joint: joint || undefined,
      zip: zip || undefined,
      radius: radius || undefined,
      limit,
    }, { encodeValuesOnly: true });
    reqUrl = `doctors?${queryStr}`;
  }

  try {
    const data = yield call(request, reqUrl, 'GET', null, true);
    yield put(homeDoctorSearchSuccess(data));
  } catch (err) {
    yield put(homeDoctorSearchError(err));
  }
}

export function* homePreferredDoctorsRequest() {
  const reqUrl = 'doctors?show_on_home=1&limit=6';

  try {
    const data = yield call(request, reqUrl, 'GET', null, true);
    yield put(homePreferredDoctorsSuccess(data));
  } catch (err) {
    yield put(homePreferredDoctorsError(err));
  }
}

export default [
  fork(takeLatest, CONSTANTS.HOME_DOCTOR_SEARCH_REQUEST, homeDoctorSearchRequest),
  fork(takeLatest, CONSTANTS.HOME_PREFERRED_DOCTOR_REQUEST, homePreferredDoctorsRequest),
];
