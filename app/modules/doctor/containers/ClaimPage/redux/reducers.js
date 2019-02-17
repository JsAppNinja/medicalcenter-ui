import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  loading: false,
  claimData: null,
  error: null,
});

function claimProfileReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.CLAIM_PROFILE_REQUEST:
      return state
        .set('error', null)
        .set('loading', true);
    case CONSTANTS.CLAIM_PROFILE_SUCCESS:
      return state
        .set('loading', false);
    case CONSTANTS.CLAIM_PROFILE_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
  }

  return state;
}

export default claimProfileReducer;
