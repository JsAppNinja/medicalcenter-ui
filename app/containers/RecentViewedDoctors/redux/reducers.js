import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  list: [],
  loading: false,
});

function homeReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.SERVICES_RECENT_VIEWED_DOCTORS_REQUEST:
      return state.setIn(['loading'], true);
    case CONSTANTS.SERVICES_RECENT_VIEWED_DOCTORS_SUCCESS:
      return state.setIn(['list'], fromJS(action.data))
        .setIn(['loading'], false);
    case CONSTANTS.SERVICES_RECENT_VIEWED_DOCTORS_ERROR:
      return state.setIn(['loading'], false);
    default:
  }

  return state;
}

export default homeReducer;
