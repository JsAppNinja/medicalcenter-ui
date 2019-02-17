import { createSelector } from 'reselect';

const selectTopProviders = () => (state) => state.getIn(['global', 'topProviders']);

const makeSelectTopProvidersList = () => createSelector(
  selectTopProviders(),
  (doctorState) => doctorState.get('list'),
);

export {
  selectTopProviders,
  makeSelectTopProvidersList,
};
