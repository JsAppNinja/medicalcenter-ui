/* eslint-disable */
import { call, fork, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import * as CONSTANTS from './constants';
import { makeSelectSessionId } from './selectors';
import {
  createWishlistSuccess,
  getWishlistSuccess,
} from './actions';

export function* createWishlistRequest() {
  try {
    const data = yield call(request, 'wishlist', 'POST', null, true);
    yield put(createWishlistSuccess(data.sessionId));
  } catch (err) {
    console.error(err);
  }
}

export function* getWishlistRequest(action) {
  try {
    const data = yield call(request, `wishlist/${action.sessionId}`, 'GET', null, true);
    yield put(getWishlistSuccess(data));
  } catch (err) {
    console.error(err);
  }
}

export function* addToWishlist(action) {
  try {
    const state = yield select();
    const sessionId = makeSelectSessionId()(state);
    yield call(request, `wishlist/${sessionId}`, 'POST', {
      ...action.doctor.toJS(),
      uuid: action.uuid,
    }, true);
  } catch (err) {
    console.error(err);
  }
}

export function* removeFromWishlist(action) {
  try {
    const state = yield select();
    const sessionId = makeSelectSessionId()(state);
    yield call(request, `wishlist/${sessionId}/${action.uuid}`, 'DELETE', null, true);
  } catch (err) {
    console.error(err);
  }
}

export default function* saveDoctorModalSaga() {
  yield [
    // fork(takeLatest, CONSTANTS.DOCTOR_CREATE_WISHLIST_REQUEST, createWishlistRequest),
    // fork(takeLatest, CONSTANTS.DOCTOR_GET_WISHLIST_REQUEST, getWishlistRequest),
    // fork(takeLatest, CONSTANTS.DOCTOR_SAVE_MODAL_ADD, addToWishlist),
    // fork(takeLatest, CONSTANTS.DOCTOR_SAVE_MODAL_REMOVE, removeFromWishlist),
  ];
}
