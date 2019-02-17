import { call, put, takeLatest, select } from 'redux-saga/effects';
import moment from 'moment';
import request from 'utils/request';
import { fetchToken } from 'utils/helcim';
import history from 'browserHistory';
import { bookingSelector, detailSelector, selectPrice, makeSelectCoupon } from './selectors';

import * as CONSTANTS from './constants';
import {
  doctorCheckoutSuccess,
  doctorCheckoutError,
  doctorCouponSuccess,
  doctorCouponError,
} from './actions';

function getDate(state, dateFieldName) {
  const val = bookingSelector(state, dateFieldName);
  if (val) {
    return moment(val, 'Do MMMM, YYYY').format('YYYY-MM-DD');
  }

  return '';
}

function getDOB(state) {
  const day = detailSelector(state, 'birthDay');
  const month = detailSelector(state, 'birthMonth');
  const year = detailSelector(state, 'birthYear');
  return `${year}-${month}-${day}`;
}

export function* doctorCheckoutRequest(action) {
  try {
    const state = yield select();
    const profile = state.getIn(['doctor', 'profile']);
    const price = selectPrice()(state);
    const bundles = state.getIn(['doctor', 'profile', 'bundles']);
    const bundle = bundles.find((b) => b.get('uuid') === action.bundleUUID);
    const coupon = makeSelectCoupon()(state);

    const requestData = {
      consultDateOne: getDate(state, 'date_1'),
      consultDateTwo: getDate(state, 'date_2'),
      consultDateThree: getDate(state, 'date_3'),
      consultDateFour: getDate(state, 'date_4'),
      zipcode: bookingSelector(state, 'zipcode'),
      firstName: detailSelector(state, 'firstName'),
      lastName: detailSelector(state, 'lastName'),
      email: detailSelector(state, 'email'),
      phone: detailSelector(state, 'phone'),
      dob: getDOB(state),
      billingAddress: detailSelector(state, 'billingAddress'),
      billingZipcode: detailSelector(state, 'billingZipcode'),
      cc: detailSelector(state, 'cardNumber'),
      cvv: detailSelector(state, 'cvv'),
      expire: `${detailSelector(state, 'expirationMonth')}/${detailSelector(state, 'expirationYear')}`,
      total: price.total,
      subtotal: price.subtotal,
      discount: price.discount,
      terms: '1',
      hipaa: '1',
      coupon: coupon ? coupon.get('name') : undefined,
      doctorID: action.doctorID,
      bundleID: action.bundleUUID,
      doctorName: profile.get('name'),
      bundleTitle: bundle.get('title'),
    };

    const helcimResp = yield call(fetchToken, {
      cardNumber: requestData.cc,
      cardExpiry: requestData.expire,
      cardCVV: requestData.cvv,
      cardHolderName: `${requestData.firstName} ${requestData.lastName}`,
      cardHolderAddress: requestData.billingAddress,
      cardHolderPostalCode: requestData.zipcode,
      amount: price.total,
    });

    if (parseInt(helcimResp.response, 10) === 1) {
      requestData.cc = helcimResp.cardNumber;
      requestData.expire = helcimResp.cardExpiry;
      requestData.cardToken = helcimResp.cardToken;
      requestData.cardType = helcimResp.cardType;

      delete requestData.cvv;
    } else {
      console.error(helcimResp); // eslint-disable-line no-console
      yield put(doctorCheckoutError(helcimResp.responseMessage || 'There was problem generating processing checkout'));
      return;
    }

    const response = yield call(request, 'order', 'POST', { ...requestData }, true);

    yield put(doctorCheckoutSuccess(response.result));
    history.push(`/doctor/${action.doctorID}/checkout-success/${action.bundleUUID}/${response.result.uuid}`);
  } catch (err) {
    const msg = err.message || 'There was problem with the request';
    yield put(doctorCheckoutError(msg));
  }
}

export function* doctorCouponRequest(action) {
  try {
    const resp = yield call(request, 'coupon/verify', 'POST', {
      doctor: action.doctor,
      coupon: action.coupon,
    });

    if (!resp || !resp.coupon) {
      throw new Error('Invalid coupon');
    }

    yield put(doctorCouponSuccess(resp.coupon));
  } catch (e) {
    const msg = e.message || 'There was problem with the request';
    yield put(doctorCouponError(msg));
  }
}

export default function* checkoutSaga() {
  yield takeLatest(CONSTANTS.DOCTOR_CHECKOUT_REQUEST, doctorCheckoutRequest);
  yield takeLatest(CONSTANTS.DOCTOR_COUPON_REQUEST, doctorCouponRequest);
}
