import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import history from 'browserHistory';

import * as CONSTANTS from './constants';
import {
  onboardDoctorProfileRequest,
  onboardDoctorProfileSuccess,
  onboardDoctorProfileError,
  saveOnboardSuccess,
  saveOnboardError,
} from './actions';

import formBuilders from './form-builders';

function normalizeRequest(data) {
  const requestData = {};
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      requestData[key] = data[key];
    }
  });

  return requestData;
}

export function* saveOnboardRequest(action) {
  const { formName, nextPath } = action;
  try {
    const state = yield select();
    const requestData = normalizeRequest(formBuilders[formName](state));
    console.log('Request Data', requestData); // eslint-disable-line
    const response = yield call(request, `onboarding/${action.id}`, 'POST', { ...requestData }, true);
    yield put(saveOnboardSuccess(response.result));
    yield put(onboardDoctorProfileRequest(action.id));
    if (nextPath) {
      history.push(`/onboarding/${action.id}/${nextPath}`);
    }
  } catch (err) {
    const msg = err.message || 'There was problem with the request';
    yield put(saveOnboardError(msg));
  }
}

export function* getOnbordDoctorProfile(action) {
  try {
    const data = yield call(request, `doctor/${action.id}`, 'GET', null, true);
    yield put(onboardDoctorProfileSuccess(data));
  } catch (err) {
    yield put(onboardDoctorProfileError(err));
    history.push('/404');
  }
}

export default function* checkoutSaga() {
  yield takeLatest(CONSTANTS.ONBOARD_DOCTOR_PROFILE_REQUEST, getOnbordDoctorProfile);
  yield takeLatest(CONSTANTS.SAVE_ONBOARD_REQUEST, saveOnboardRequest);
}
