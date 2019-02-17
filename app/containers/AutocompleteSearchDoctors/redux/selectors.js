import { createSelector } from 'reselect';

const selectAutocomplete = () => (state) => state.getIn(['global', 'autocomplete']);

const makeSelectAutocompleteKeywords = () => createSelector(
  selectAutocomplete(),
  (doctorState) => doctorState.get('keywords'),
);

export {
  selectAutocomplete,
  makeSelectAutocompleteKeywords,
};
