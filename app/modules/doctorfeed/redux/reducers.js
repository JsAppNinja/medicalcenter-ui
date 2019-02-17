import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initialState = fromJS({
  list: [],
  loading: false,
  from: 0,
  countDisplay: 0,
  isPackageDoctorSearch: false,
});

function doctorFeedReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.FEED_DOCTOR_SEARCH_REQUEST:
      return state.setIn(['loading'], true);
    case CONSTANTS.FEED_DOCTOR_SEARCH_SUCCESS:
      if (action.isResetSearch && !action.isPackageDoctorSearch) {
        return state.setIn(['list'], fromJS(action.data))
          .setIn(['from'], 50)
          .setIn(['loading'], false)
          .setIn(['isPackageDoctorSearch'], action.isPackageDoctorSearch)
          .setIn(['countDisplay'], 10);
      } else if (action.isPackageDoctorSearch) {
        return state.setIn(['list'], fromJS(action.data))
          .setIn(['loading'], false)
          .setIn(['isPackageDoctorSearch'], action.isPackageDoctorSearch)
          .setIn(['countDisplay'], 10);
      }

      return state.setIn(['list'], state.getIn(['list']).concat(fromJS(action.data)))
        .setIn(['loading'], false)
        .setIn(['from'], state.getIn(['from']) + 50)
        .setIn(['isPackageDoctorSearch'], action.isPackageDoctorSearch)
        .setIn(['countDisplay'], state.getIn(['countDisplay']) + 10);
    case CONSTANTS.FEED_DOCTOR_SEARCH_ERROR:
      return state.setIn(['loading'], false);
    case CONSTANTS.SET_DISPLAY_FEED_COUNT:
      return state.setIn(['countDisplay'], state.getIn(['countDisplay']) + 10);
    case CONSTANTS.INIT_DOCTORLIST_DATA:
      return state.setIn(['list'], [])
        .setIn(['loading'], false)
        .setIn(['from'], 0)
        .setIn(['isPackageDoctorSearch'], false)
        .setIn(['countDisplay'], 0);
    default:
  }

  return state;
}

export default doctorFeedReducer;
