import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  user: null,
  loading: true,
});

function authReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.AUTH_USER_LOADING:
      return state.set('loading', fromJS(action.loading));
    case CONSTANTS.AUTH_USER_SET:
      return state.set('user', fromJS(action.user))
        .set('loading', false);
    default:
  }

  return state;
}

export default authReducer;
