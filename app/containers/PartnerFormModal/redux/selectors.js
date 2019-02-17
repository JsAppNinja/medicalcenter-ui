import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';

const partnerSelector = formValueSelector('partner-form');

const selectPartner = () => (state) => state.get('partner');

const makeSelectPartnerInfoSending = () => createSelector(
  selectPartner(),
  (partnerState) => partnerState.get('loading')
);

const makeSelectPartnerInfoSent = () => createSelector(
  selectPartner(),
  (contactState) => contactState.get('sent')
);

const makeSelectPartnerModalShow = () => createSelector(
  selectPartner(),
  (partnerState) => partnerState.get('partnerModal'),
);

export {
  partnerSelector,
  makeSelectPartnerInfoSending,
  makeSelectPartnerInfoSent,
  makeSelectPartnerModalShow,
};
