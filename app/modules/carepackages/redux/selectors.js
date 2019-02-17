import { createSelector } from 'reselect';

const selectFilteredPackages = (state) => state.getIn(['carepackages']);

const makeSelectFilteredPackagesList = () => createSelector(
  selectFilteredPackages,
  (filteredPackagesState) => filteredPackagesState.get('filteredPackages'),
);

const makeSelectSearchIsLoading = () => createSelector(
  selectFilteredPackages,
  (doctorState) => doctorState.get('loading'),
);

const makeSelectPackagefeedSearchStart = () => createSelector(
  selectFilteredPackages,
  (packageFromState) => packageFromState.get('from'),
);

const makeSelectDisplayFeedItemsCount = () => createSelector(
  selectFilteredPackages,
  (packageDisplayState) => packageDisplayState.get('countDisplay'),
);

export {
  selectFilteredPackages,
  makeSelectFilteredPackagesList,
  makeSelectSearchIsLoading,
  makeSelectPackagefeedSearchStart,
  makeSelectDisplayFeedItemsCount,
};
