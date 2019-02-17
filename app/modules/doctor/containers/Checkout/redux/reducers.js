import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  loading: false,
  orderData: null,
  error: null,
  coupon: null,
  couponError: null,
  couponLoading: false,
});

function doctorCheckoutReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.DOCTOR_CHECKOUT_REQUEST:
      return state
        .set('error', null)
        .setIn(['loading'], true);
    case CONSTANTS.DOCTOR_CHECKOUT_SUCCESS:
      return state.setIn(['orderData'], fromJS(action.data))
        .setIn(['loading'], false);
    case CONSTANTS.DOCTOR_CHECKOUT_ERROR:
      return state.setIn(['loading'], false)
        .set('error', action.error);
    case CONSTANTS.DOCTOR_COUPON_REQUEST:
      return state
        .set('coupon', null)
        .set('couponError', null)
        .set('couponLoading', true);
    case CONSTANTS.DOCTOR_COUPON_SUCCESS:
      return state.set('coupon', fromJS(action.data))
        .set('couponLoading', false);
    case CONSTANTS.DOCTOR_COUPON_ERROR:
      return state.set('couponLoading', false)
        .set('couponError', action.error);
    default:
  }

  return state;
}

export default doctorCheckoutReducer;
