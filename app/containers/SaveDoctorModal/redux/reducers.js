import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  sessionId: null,
  show: false,
  doctors: {},
});

function saveDoctorModalReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.DOCTOR_SAVE_MODAL_SHOW:
      return state.set('show', true);
    case CONSTANTS.DOCTOR_SAVE_MODAL_HIDE:
      return state.set('show', false);
    case CONSTANTS.DOCTOR_SAVE_MODAL_ADD:
      return state
        .set('show', true)
        .setIn(['doctors', action.uuid], fromJS(action.doctor));
    case CONSTANTS.DOCTOR_SAVE_MODAL_REMOVE:
      return state.deleteIn(['doctors', action.uuid]);
    case CONSTANTS.DOCTOR_CREATE_WISHLIST_SUCCESS:
      return state
        .set('sessionId', action.sessionId);
    case CONSTANTS.DOCTOR_GET_WISHLIST_SUCCESS:
      return state
        .set('doctors', action.data);
    default:
  }

  return state;
}

export default saveDoctorModalReducer;
