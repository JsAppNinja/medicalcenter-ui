import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  show: false,
});

function signupModalReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.SIGNUP_MODAL_SHOW:
      return state.set('show', true);
    case CONSTANTS.SIGNUP_MODAL_HIDE:
      return state.set('show', false);
    default:
  }

  return state;
}

export default signupModalReducer;
