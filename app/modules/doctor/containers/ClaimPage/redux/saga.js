import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { auth, db } from 'utils/firebase';
import { uid } from 'rand-token';
import { claimSelector } from './selectors';
import * as CONSTANTS from './constants';
import { toggleClaim } from '../../../redux/actions';
import {
  claimProfileSuccess,
  claimProfileError,
} from './actions';

export function* claimProfileRequest(action) {
  try {
    const state = yield select();
    const password = uid(10);

    const requestData = {
      firstName: claimSelector(state, 'firstName'),
      lastName: claimSelector(state, 'lastName'),
      email: claimSelector(state, 'email'),
      phone: claimSelector(state, 'phone'),
      profileId: action.doctorID,
    };

    const authUser = yield call(auth.doCreateUserWithEmailAndPassword, requestData.email, password);
    yield call(db.doCreateUser, requestData);
    const response = yield call(request, 'profile/claim', 'POST', {
      ...requestData,
      password,
      userId: authUser.user.uid,
    }, true);

    yield put(claimProfileSuccess(response.result));
    yield put(toggleClaim(true));
  } catch (err) {
    yield put(claimProfileError(err && err.message ? err.message : err));
  }
}

export default function* checkoutSaga() {
  yield takeLatest(CONSTANTS.CLAIM_PROFILE_REQUEST, claimProfileRequest);
}
