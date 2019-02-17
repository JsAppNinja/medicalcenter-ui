import { createSelector } from 'reselect';

const selectHomeDoctors = (state) => state.getIn(['home', 'doctors']);

const makeSelectDoctorList = () => createSelector(
  selectHomeDoctors,
  (doctorState) => doctorState.get('list'),
);

const makeSelectPreferredDoctorList = () => createSelector(
  selectHomeDoctors,
  (doctorState) => doctorState.get('preferredList'),
);

const makeSelectSearchIsLoading = () => createSelector(
  selectHomeDoctors,
  (doctorState) => doctorState.get('loading'),
);

const makeSelectHoverDoctorId = () => createSelector(
  selectHomeDoctors,
  (doctorHoverState) => doctorHoverState.get('hoverDoctorId')
);

export {
  selectHomeDoctors,
  makeSelectDoctorList,
  makeSelectSearchIsLoading,
  makeSelectHoverDoctorId,
  makeSelectPreferredDoctorList,
};
