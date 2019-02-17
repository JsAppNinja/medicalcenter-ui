import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  show: false,
});

function loginModalReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.LOGIN_MODAL_SHOW:
      return state.set('show', true);
    case CONSTANTS.LOGIN_MODAL_HIDE:
      return state.set('show', false);
    default:
  }

  return state;
}

export default loginModalReducer;
