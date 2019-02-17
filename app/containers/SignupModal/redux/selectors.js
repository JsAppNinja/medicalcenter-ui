import { createSelector } from 'reselect';

const selectSignupModal = () => (state) => state.getIn(['signupModal']);

const makeSelectSignupModalShow = () => createSelector(
  selectSignupModal(),
  (modalState) => modalState.get('show'),
);
export {
  selectSignupModal,
  makeSelectSignupModalShow,
};
