import * as CONSTANTS from './constants';

export function showSaveDoctorModal() {
  return {
    type: CONSTANTS.DOCTOR_SAVE_MODAL_SHOW,
  };
}

export function hideSaveDoctorModal() {
  return {
    type: CONSTANTS.DOCTOR_SAVE_MODAL_HIDE,
  };
}

export function saveDoctorToList(uuid, doctor) {
  return {
    type: CONSTANTS.DOCTOR_SAVE_MODAL_ADD,
    uuid,
    doctor,
  };
}

export function removeDoctorFromList(uuid) {
  return {
    type: CONSTANTS.DOCTOR_SAVE_MODAL_REMOVE,
    uuid,
  };
}

export function createWishlist() {
  return {
    type: CONSTANTS.DOCTOR_CREATE_WISHLIST_REQUEST,
  };
}

export function getWishlist(sessionId) {
  return {
    type: CONSTANTS.DOCTOR_GET_WISHLIST_REQUEST,
    sessionId,
  };
}

export function createWishlistSuccess(sessionId) {
  return {
    type: CONSTANTS.DOCTOR_CREATE_WISHLIST_SUCCESS,
    sessionId,
  };
}

export function getWishlistSuccess(data) {
  return {
    type: CONSTANTS.DOCTOR_GET_WISHLIST_SUCCESS,
    data,
  };
}
