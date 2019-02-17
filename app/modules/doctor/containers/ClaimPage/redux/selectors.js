import { formValueSelector } from 'redux-form/immutable';

const claimSelector = formValueSelector('claim-profile');

const makeSelectClaimLoading = () => (state) => state.getIn(['claim', 'loading']);
const makeSelectClaimError = () => (state) => state.getIn(['claim', 'error']);

export {
  claimSelector,
  makeSelectClaimLoading,
  makeSelectClaimError,
};
