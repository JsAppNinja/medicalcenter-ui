import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  loading: false,
  sent: false,
  partnerModal: false,
});

function partnerReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.PARTNER_INFO_REQUEST:
      return state.setIn(['loading'], true);
    case CONSTANTS.PARTNER_INFO_SUCCESS:
      return state.setIn(['sent'], true)
        .setIn(['loading'], false);
    case CONSTANTS.PARTNER_INFO_RESET:
      return state.set('sent', false);
    case CONSTANTS.PARTNER_INFO_ERROR:
      return state.setIn(['loading'], false);
    case CONSTANTS.PARTNER_FORM_MODAL_TOGGLE:
      return state.set('partnerModal', action.show);
    default:
  }

  return state;
}

export default partnerReducer;
