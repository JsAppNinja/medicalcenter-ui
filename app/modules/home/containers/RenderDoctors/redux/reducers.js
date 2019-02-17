import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initialState = fromJS({
  list: {
    providers: [],
  },
  preferredList: {
    providers: [],
  },
  loading: false,
  hoverDoctorId: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.HOME_DOCTOR_SEARCH_REQUEST:
      return state.setIn(['loading'], true);
    case CONSTANTS.HOME_DOCTOR_SEARCH_SUCCESS:
      return state.setIn(['list'], fromJS(action.data))
        .setIn(['loading'], false);
    case CONSTANTS.HOME_PREFERRED_DOCTOR_SUCCESS:
      return state.setIn(['preferredList'], fromJS(action.data))
        .setIn(['loading'], false);
    case CONSTANTS.HOME_DOCTOR_SEARCH_ERROR:
      return state.setIn(['loading'], false);
    case CONSTANTS.HOME_SET_HOVER_DOCTOR_REQUEST:
      return state.setIn(['hoverDoctorId'], action.hoverDoctorId);
    default:
  }

  return state;
}

export default homeReducer;
