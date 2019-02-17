import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import history from 'browserHistory';

// import SAMPLE_DATA from './sample-profile';

import * as CONSTANTS from './constants';
import {
  doctorProfileSuccess,
  doctorProfileError,
} from './actions';

export function* doctorProfileRequest(action) {
  try {
    const data = yield call(request, `doctor/${action.id}`, 'GET', null, true);
    yield put(doctorProfileSuccess(data));
  } catch (err) {
    yield put(doctorProfileError(err));
    history.push('/404');
  }
}

export default function* doctorSaga() {
  yield takeLatest(CONSTANTS.DOCTOR_PROFILE_REQUEST, doctorProfileRequest);
}
