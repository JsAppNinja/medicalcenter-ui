import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  label: '',
});

function setSelectOptionLabel(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.SET_SELECTOPTION_LABEL:
      return state.set('label', action.data);
    default:
  }

  return state;
}

export default setSelectOptionLabel;
