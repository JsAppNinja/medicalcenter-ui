import * as CONSTANTS from './constants';

export function doctorCheckoutRequest(doctorID, bundleUUID) {
  return {
    type: CONSTANTS.DOCTOR_CHECKOUT_REQUEST,
    doctorID,
    bundleUUID,
  };
}

export function doctorCheckoutSuccess(data) {
  return {
    type: CONSTANTS.DOCTOR_CHECKOUT_SUCCESS,
    data,
  };
}

export function doctorCheckoutError(error) {
  return {
    type: CONSTANTS.DOCTOR_CHECKOUT_ERROR,
    error,
  };
}

export function doctorCouponRequest(doctor, coupon) {
  return {
    type: CONSTANTS.DOCTOR_COUPON_REQUEST,
    doctor,
    coupon,
  };
}

export function doctorCouponSuccess(data) {
  return {
    type: CONSTANTS.DOCTOR_COUPON_SUCCESS,
    data,
  };
}

export function doctorCouponError(error) {
  return {
    type: CONSTANTS.DOCTOR_COUPON_ERROR,
    error,
  };
}
