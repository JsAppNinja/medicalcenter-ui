import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  list: [],
  loading: false,
});

function topProviderReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.TOP_PROVIDERS_REQUEST:
      return state.setIn(['loading'], true);
    case CONSTANTS.TOP_PROVIDERS_SUCCESS:
      return state.setIn(['list'], fromJS(action.data))
        .setIn(['loading'], false);
    case CONSTANTS.TOP_PROVIDERS_ERROR:
      return state.setIn(['loading'], false);
    default:
  }

  return state;
}

export default topProviderReducer;
