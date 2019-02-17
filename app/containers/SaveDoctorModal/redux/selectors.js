import { createSelector } from 'reselect';

const selectSaveDoctorModal = () => (state) => state.getIn(['global', 'saveDoctorModal']);

const makeSelectDoctorSaveModalShow = () => createSelector(
  selectSaveDoctorModal(),
  (modalState) => modalState.get('show'),
);

const makeSelectDoctorSaveModalDoctors = () => createSelector(
  selectSaveDoctorModal(),
  (modalState) => modalState.get('doctors'),
);

const makeSelectSessionId = () => createSelector(
  selectSaveDoctorModal(),
  (modalState) => modalState.get('sessionId'),
);

export {
  selectSaveDoctorModal,
  makeSelectDoctorSaveModalShow,
  makeSelectDoctorSaveModalDoctors,
  makeSelectSessionId,
};
