import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import qs from 'qs';

import * as CONSTANTS from './constants';
import { makeSelectDoctorfeedSearchStart } from './selectors';
import {
  doctorFeedSearchSuccess,
  doctorFeedSearchError,
} from './actions';

export function* doctorFeedSearchRequest(action) {
  const {
    joint,
    zip,
    radius,
    keyword,
  } = action.searchOptions;
  const {
    isResetSearch,
    isPackageDoctorSearch,
  } = action;

  const limit = 50;
  let reqUrl = '';
  const state = yield select();
  const from = makeSelectDoctorfeedSearchStart()(state);

  if (isPackageDoctorSearch) {
    reqUrl = `package/${action.packageName}`;
  } else {
    const queryStr = qs.stringify({
      q: keyword,
      joint,
      zip: zip || undefined,
      radius,
      limit,
      from,
    }, { encodeValuesOnly: true, skipNulls: true });
    reqUrl = `doctors?${queryStr}`;
  }
  try {
    const data = yield call(request, reqUrl, 'GET', null, true);
    yield put(doctorFeedSearchSuccess(data.providers, isResetSearch, isPackageDoctorSearch));
  } catch (err) {
    yield put(doctorFeedSearchError(err));
  }
}

export default function* doctorSaga() {
  yield takeLatest(CONSTANTS.FEED_DOCTOR_SEARCH_REQUEST, doctorFeedSearchRequest);
}
