import * as CONSTANTS from './constants';

export function setSelectOptionLabel(label) {
  return {
    type: CONSTANTS.SET_SELECTOPTION_LABEL,
    data: label,
  };
}
