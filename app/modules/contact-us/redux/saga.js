import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { contactSelector, makeSelectCaptcha } from './selectors';

import * as CONSTANTS from './constants';
import {
  contactSuccess,
  contactError,
} from './actions';

export function* contactRequest() {
  try {
    const state = yield select();

    const requestData = {
      firstName: contactSelector(state, 'firstName'),
      lastName: contactSelector(state, 'lastName'),
      email: contactSelector(state, 'email'),
      phone: contactSelector(state, 'phone'),
      subject: contactSelector(state, 'subject'),
      comment: contactSelector(state, 'comment'),
      captcha: makeSelectCaptcha()(state),
    };

    yield call(request, 'contact', 'POST', requestData, true);

    yield put(contactSuccess());
  } catch (err) {
    yield put(contactError(err));
  }
}

export default function* checkoutSaga() {
  yield takeLatest(CONSTANTS.CONTACT_REQUEST, contactRequest);
}
