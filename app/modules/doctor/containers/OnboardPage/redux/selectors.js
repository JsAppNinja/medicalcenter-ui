import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';

const selectOnboard = () => (state) => state.get('onboard');
const basicInfoSelector = formValueSelector('doctor-basic-info');
const existingPackageSelector = formValueSelector('doctor-existing-packages');
const addPackageSelector = formValueSelector('doctor-add-packages');
const aboutInfoSelector = formValueSelector('doctor-about');
const qaSelector = formValueSelector('doctor-qa');
const blogSelector = formValueSelector('doctor-blog');
const travelSelector = formValueSelector('doctor-travel');

const makeSelectOnboardDoctorId = () => createSelector(
  selectOnboard(),
  (onboardState) => onboardState.getIn(['onboardDoctorProfile', 'uuid'])
);

const makeSelectOnboardDoctorProfile = () => createSelector(
  selectOnboard(),
  (onboardState) => onboardState.get('onboardDoctorProfile')
);

const makeSelectOnboardLoading = () => createSelector(
  selectOnboard(),
  (onboardState) => onboardState.get('loading')
);

const makeSelectOnboardError = () => createSelector(
  selectOnboard(),
  (onboardState) => onboardState.get('error')
);

const makeSelectOnboardSaving = () => createSelector(
  selectOnboard(),
  (onboardState) => onboardState.get('saving')
);

const makeSelectOnboardSaveError = () => createSelector(
  selectOnboard(),
  (onboardState) => onboardState.get('saveError')
);

// modal dialog selector
const makeSelectAvatarUploadModalShow = () => createSelector(
  selectOnboard(),
  (onboardState) => onboardState.get('avatarUploadModalShow'),
);

const avatarSelector = () => createSelector(
  selectOnboard(),
  (onboardState) => onboardState.get('avatarImageUrl')
);

export {
  selectOnboard,
  basicInfoSelector,
  existingPackageSelector,
  addPackageSelector,
  aboutInfoSelector,
  qaSelector,
  blogSelector,
  travelSelector,
  makeSelectOnboardDoctorId,
  makeSelectOnboardDoctorProfile,
  makeSelectOnboardLoading,
  makeSelectOnboardError,
  makeSelectOnboardSaving,
  makeSelectOnboardSaveError,
  makeSelectAvatarUploadModalShow,
  avatarSelector,
};
