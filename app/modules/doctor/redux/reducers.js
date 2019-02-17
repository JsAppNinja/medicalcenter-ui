import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  profile: null,
  loading: true,
  socialModal: false,
  shareVideoIndex: undefined,
  claimed: false,
});

function doctorReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.DOCTOR_PROFILE_REQUEST:
      return state
        .setIn(['loading'], true)
        .set('claimed', false);
    case CONSTANTS.DOCTOR_PROFILE_SUCCESS:
      return state
        .set('profile', fromJS(action.data))
        .set('claimed', action.data && action.data.claimed)
        .set('loading', false);
    case CONSTANTS.DOCTOR_PROFILE_ERROR:
      return state.setIn(['loading'], false);
    case CONSTANTS.DOCTOR_SOCIAL_MODAL_TOGGLE:
      return state.set('socialModal', action.show)
        .set('shareVideoIndex', action.videoIndex);
    case CONSTANTS.DOCTOR_CLAIM_TOGGLE:
      return state.set('claimed', action.claimed);
    default:
  }

  return state;
}

export default doctorReducer;
