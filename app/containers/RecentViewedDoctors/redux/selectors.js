import { createSelector } from 'reselect';

const selectRecentViewedDoctors = () => (state) => state.getIn(['global', 'recentViewedDoctors']);

const makeSelectRecentViewedDoctorsList = () => createSelector(
  selectRecentViewedDoctors(),
  (doctorState) => doctorState.get('list'),
);

export {
  selectRecentViewedDoctors,
  makeSelectRecentViewedDoctorsList,
};
