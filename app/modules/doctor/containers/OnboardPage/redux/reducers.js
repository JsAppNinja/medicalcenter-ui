import { fromJS, List } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  onboardDoctorId: null,
  onboardDoctorProfile: null,
  loading: false,
  error: null,

  saving: false,
  saveError: null,

  avatarUploadModalShow: false,
  avatarImageUrl: '',
});

function doctorOnboardReducer(state = initalState, action) {
  switch (action.type) {
    // LOADING
    case CONSTANTS.ONBOARD_DOCTOR_PROFILE_REQUEST:
      return state
        .setIn(['onboardDoctorId'], action.id)
        .setIn(['loading'], true);
    case CONSTANTS.ONBOARD_DOCTOR_PROFILE_SUCCESS:
      return state
        .set('onboardDoctorProfile', fromJS(action.data))
        .set('loading', false);
    case CONSTANTS.ONBOARD_DOCTOR_PROFILE_ERROR:
      return state.setIn(['loading'], false);

    // SAVING
    case CONSTANTS.SAVE_ONBOARD_REQUEST:
      return state
        .set('savingError', null)
        .setIn(['saving'], true);
    case CONSTANTS.SAVE_ONBOARD_SUCCESS:
      return state.setIn(['saving'], false);
    case CONSTANTS.SAVE_ONBOARD_ERROR:
      return state.setIn(['saving'], false)
        .set('savingError', action.error);

    // bundles
    case CONSTANTS.ADD_PACKAGE:
    {
      return state.updateIn(
        ['onboardDoctorProfile', 'bundles'],
        List(),
        (list) => list.push(fromJS(action.packageData))
      );
    }
    case CONSTANTS.EDIT_PACAKGE: {
      const bundleIndex = state.getIn(['onboardDoctorProfile', 'bundles']).findIndex((b) => b.get('uuid') === action.index);
      return state.mergeIn(['onboardDoctorProfile', 'bundles', bundleIndex], fromJS(action.packageData));
    }
    case CONSTANTS.REMOVE_PACKAGE:
      return state.deleteIn(['onboardDoctorProfile', 'bundles', action.index]);

    case CONSTANTS.AVATAR_UPLOAD_MODAL_TOGGLE:
      return state.set('avatarUploadModalShow', action.show);
    case CONSTANTS.SET_AVATAR_IMAGE_URL:
      return state.set('avatarImageUrl', action.avatarUrl);
    case CONSTANTS.ADD_MEDIA:
      return state.updateIn(
        ['onboardDoctorProfile', `${action.mediaType}s`],
        List(),
        (list) => list.push(fromJS(action.media))
      );
    case CONSTANTS.REMOVE_MEDIA:
      return state.deleteIn(['onboardDoctorProfile', `${action.mediaType}s`, action.index]);
    default:
  }

  return state;
}

export default doctorOnboardReducer;
