import * as CONSTANTS from './constants';

export function partnerInfoRequest() {
  return {
    type: CONSTANTS.PARTNER_INFO_REQUEST,
  };
}

export function partnerInfoSuccess() {
  return {
    type: CONSTANTS.PARTNER_INFO_SUCCESS,
  };
}

export function partnerInfoError(error) {
  return {
    type: CONSTANTS.PARTNER_INFO_ERROR,
    error,
  };
}

export function partnerInfoReset() {
  return {
    type: CONSTANTS.PARTNER_INFO_RESET,
  };
}

// modal
export function togglePartnerModal(show = true) {
  return {
    type: CONSTANTS.PARTNER_FORM_MODAL_TOGGLE,
    show,
  };
}
