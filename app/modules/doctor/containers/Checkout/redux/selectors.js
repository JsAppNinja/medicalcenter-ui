import { createSelector } from 'reselect';
import zipcodes from 'zipcodes';
import { formValueSelector } from 'redux-form/immutable';
import { getCurrency } from 'utils/currency';

const bookingSelector = formValueSelector('doctor-booking');
const detailSelector = formValueSelector('doctor-checkout');

const selectCheckoutValid = () => (state) => {
  const termsOfUse = detailSelector(state, 'termsOfUse');
  const hippaAuth = detailSelector(state, 'hippaAuth');

  return termsOfUse && hippaAuth;
};

const selectCheckoutDates = () => (state) => ({
  date_1: bookingSelector(state, 'date_1'),
  date_2: bookingSelector(state, 'date_2'),
  date_3: bookingSelector(state, 'date_3'),
  date_4: bookingSelector(state, 'date_4'),
});

const selectCheckoutCustomer = () => (state) => ({
  email: detailSelector(state, 'email'),
  firstName: detailSelector(state, 'firstName'),
  lastName: detailSelector(state, 'lastName'),
});

const selectCheckout = () => (state) => state.get('checkout');
const selectBundles = () => (state) => state.getIn(['doctor', 'profile', 'bundles']);
const selectDoctorzip = () => (state) => state.getIn(['doctor', 'profile', 'zipcode']);
const selectZipcode = () => (state) => bookingSelector(state, 'zipcode');
const makeSelectCheckoutLoading = () => createSelector(
  selectCheckout(),
  (checkoutState) => checkoutState.get('loading')
);

const makeSelectCheckoutError = () => createSelector(
  selectCheckout(),
  (checkoutState) => checkoutState.get('error')
);

const makeSelectCouponLoading = () => createSelector(
  selectCheckout(),
  (checkoutState) => checkoutState.get('couponLoading')
);

const makeSelectCouponError = () => createSelector(
  selectCheckout(),
  (checkoutState) => checkoutState.get('couponError')
);

const makeSelectCoupon = () => createSelector(
  selectCheckout(),
  (checkoutState) => checkoutState.get('coupon')
);

const selectPrice = () => createSelector(
  selectBundles(),
  selectZipcode(),
  selectDoctorzip(),
  makeSelectCoupon(),
  (bundles, userzip, doctorzip, coupon) => {
    const distance = zipcodes.distance(userzip, doctorzip);
    let bundle = bundles.find((b) => b.get('title') === 'Virtual Consultation');
    let price = '$500';
    let discount = 0;

    if (distance > 25) { // over 25 miles
      bundle = bundles.find((b) => b.get('title') === 'In-Clinic Consultation');
    }

    if (!bundle) {
      bundle = bundles.get(0);
    }

    if (bundle) {
      price = getCurrency(bundle.get('consult_price'));
    }

    price = price.substr(1);
    if (coupon) {
      const couponType = coupon.get('type');
      const couponValue = coupon.get('value');

      if (couponType === '%') {
        discount = Math.round(price * couponValue) / 100;
      } else {
        discount = couponValue;
      }

      return {
        subtotal: `${price}`,
        discount: `${Math.min(discount, price)}`,
        total: `${Math.max(price - discount, 0)}`,
      };
    }

    return {
      subtotal: `${price}`,
      total: `${price}`,
      discount: '0',
    };
  }
);

export {
  bookingSelector,
  detailSelector,
  selectPrice,
  selectCheckoutValid,
  selectCheckoutDates,
  selectCheckoutCustomer,
  makeSelectCheckoutLoading,
  makeSelectCheckoutError,
  makeSelectCoupon,
  makeSelectCouponLoading,
  makeSelectCouponError,
};
