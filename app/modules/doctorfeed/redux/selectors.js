import { createSelector } from 'reselect';

const selectDoctorFeed = (state) => state.getIn(['doctorfeed']);

const makeSelectDoctorfeedList = () => createSelector(
  selectDoctorFeed,
  (doctorState) => doctorState.get('list'),
);

const makeSelectSearchIsLoading = () => createSelector(
  selectDoctorFeed,
  (doctorState) => doctorState.get('loading'),
);

const makeSelectDoctorfeedSearchStart = () => createSelector(
  selectDoctorFeed,
  (doctorState) => doctorState.get('from'),
);

const makeSelectPreferredDoctorsNumber = () => createSelector(
  selectDoctorFeed,
  (doctorState) => doctorState.get('preferredDoctorsNumber'),
);

const makeSelectDisplayFeedItemsCount = () => createSelector(
  selectDoctorFeed,
  (doctorState) => doctorState.get('countDisplay'),
);

const makeSelectIsPackageDoctorSearch = () => createSelector(
  selectDoctorFeed,
  (doctorState) => doctorState.get('isPackageDoctorSearch'),
);

export {
  selectDoctorFeed,
  makeSelectDoctorfeedList,
  makeSelectSearchIsLoading,
  makeSelectDoctorfeedSearchStart,
  makeSelectPreferredDoctorsNumber,
  makeSelectDisplayFeedItemsCount,
  makeSelectIsPackageDoctorSearch,
};
