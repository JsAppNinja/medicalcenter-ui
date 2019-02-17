import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  loading: false,
  sent: false,
  captcha: null,
});

function contactUsReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.CONTACT_REQUEST:
      return state.setIn(['loading'], true);
    case CONSTANTS.CONTACT_SUCCESS:
      return state.setIn(['sent'], true)
        .setIn(['loading'], false);
    case CONSTANTS.CONTACT_RESET:
      return state.set('sent', false)
        .set('captcha', null);
    case CONSTANTS.CONTACT_CAPTCHA_VERIFY:
      return state.set('captcha', action.captcha);
    case CONSTANTS.CONTACT_ERROR:
      return state.setIn(['loading'], false);
    default:
  }

  return state;
}

export default contactUsReducer;
