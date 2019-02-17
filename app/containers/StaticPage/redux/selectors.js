import { createSelector } from 'reselect';

const selectOptionLabel = () => (state) => state.getIn(['navbarPolicyLabel']);

const makeSelectOptionLabel = () => createSelector(
  selectOptionLabel(),
  (modalState) => modalState.get('label'),
);
export {
  selectOptionLabel,
  makeSelectOptionLabel,
};
