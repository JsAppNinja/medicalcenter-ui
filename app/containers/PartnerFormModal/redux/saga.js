import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { partnerSelector } from './selectors';

import * as CONSTANTS from './constants';
import {
  partnerInfoSuccess,
  partnerInfoError,
} from './actions';

export function* partnerInfoRequest() {
  try {
    const state = yield select();

    const requestData = {
      firstName: partnerSelector(state, 'firstName'),
      lastName: partnerSelector(state, 'lastName'),
      email: partnerSelector(state, 'email'),
      phone: partnerSelector(state, 'phone'),
      type: partnerSelector(state, 'type'),
      address: partnerSelector(state, 'address'),
      city: partnerSelector(state, 'city'),
      state: partnerSelector(state, 'state'),
      zipcode: partnerSelector(state, 'zipcode'),
      specialty: partnerSelector(state, 'specialty'),
      clinicGroup: partnerSelector(state, 'clinicGroup'),
      website: partnerSelector(state, 'website'),
    };

    yield call(request, 'partner/request', 'POST', requestData, true);

    yield put(partnerInfoSuccess());
  } catch (err) {
    yield put(partnerInfoError(err));
  }
}

export default function* checkoutSaga() {
  yield takeLatest(CONSTANTS.PARTNER_INFO_REQUEST, partnerInfoRequest);
}
