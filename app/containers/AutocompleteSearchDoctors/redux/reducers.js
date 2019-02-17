import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  keywords: [],
  loading: false,
});

function autocompleteReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.KEYWORDS_GET_REQUEST:
      return state.setIn(['loading'], true);
    case CONSTANTS.KEYWORDS_GET_SUCCESS:
      return state.setIn(['keywords'], fromJS(action.data))
        .setIn(['loading'], false);
    case CONSTANTS.KEYWORDS_GET_ERROR:
      return state.setIn(['loading'], false);
    default:
  }

  return state;
}

export default autocompleteReducer;
