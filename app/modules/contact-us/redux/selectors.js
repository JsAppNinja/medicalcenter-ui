import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';

const contactSelector = formValueSelector('contact-form');

const selectContact = () => (state) => state.get('contact');

const makeSelectContactSending = () => createSelector(
  selectContact(),
  (contactState) => contactState.get('loading')
);

const makeSelectContactSent = () => createSelector(
  selectContact(),
  (contactState) => contactState.get('sent')
);

const makeSelectCaptcha = () => createSelector(
  selectContact(),
  (contactState) => contactState.get('captcha')
);

export {
  contactSelector,
  makeSelectContactSending,
  makeSelectContactSent,
  makeSelectCaptcha,
};
