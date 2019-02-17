import * as CONSTANTS from './constants';

export function onboardDoctorProfileRequest(id) {
  return {
    type: CONSTANTS.ONBOARD_DOCTOR_PROFILE_REQUEST,
    id,
  };
}

export function onboardDoctorProfileSuccess(data) {
  return {
    type: CONSTANTS.ONBOARD_DOCTOR_PROFILE_SUCCESS,
    data,
  };
}

export function onboardDoctorProfileError(error) {
  return {
    type: CONSTANTS.ONBOARD_DOCTOR_PROFILE_ERROR,
    error,
  };
}

export function saveOnboardRequest(id, formName, nextPath) {
  return {
    type: CONSTANTS.SAVE_ONBOARD_REQUEST,
    id,
    formName,
    nextPath,
  };
}

export function saveOnboardSuccess(result) {
  return {
    type: CONSTANTS.SAVE_ONBOARD_SUCCESS,
    result,
  };
}

export function saveOnboardError(error) {
  return {
    type: CONSTANTS.SAVE_ONBOARD_ERROR,
    error,
  };
}

export function editPackage(index, packageData) {
  return {
    type: CONSTANTS.EDIT_PACAKGE,
    packageData,
    index,
  };
}

export function addPackage(packageData) {
  return {
    type: CONSTANTS.ADD_PACKAGE,
    packageData,
  };
}

export function removePackage(index) {
  return {
    type: CONSTANTS.REMOVE_PACKAGE,
    index,
  };
}

// Modal
export function toggleAvatarModal(show = true) {
  return {
    type: CONSTANTS.AVATAR_UPLOAD_MODAL_TOGGLE,
    show,
  };
}

export function setAvatarImageUrl(avatarUrl) {
  return {
    type: CONSTANTS.SET_AVATAR_IMAGE_URL,
    avatarUrl,
  };
}

export function addMedia(type, media) {
  return {
    type: CONSTANTS.ADD_MEDIA,
    mediaType: type,
    media,
  };
}

export function removeMedia(type, index) {
  return {
    type: CONSTANTS.REMOVE_MEDIA,
    mediaType: type,
    index,
  };
}
