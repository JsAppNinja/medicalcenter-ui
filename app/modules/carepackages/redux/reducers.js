import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initialState = fromJS({
  filteredPackages: [],
  loading: false,
  from: 0,
  countDisplay: 0,
});

function packagesFilterReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.CARE_PACKAGES_FILTER_REQUEST:
      return state.setIn(['loading'], true);
    case CONSTANTS.CARE_PACKAGES_FILTER_SUCCESS:
      if (action.isResetSearch) {
        return state.setIn(['filteredPackages'], fromJS(action.data))
          .setIn(['loading'], false)
          .setIn(['countDisplay'], 10)
          .setIn(['from'], 30);
      }
      return state.setIn(['filteredPackages'], state.getIn(['filteredPackages']).concat(fromJS(action.data)))
        .setIn(['loading'], false)
        .setIn(['countDisplay'], state.getIn(['countDisplay']) + 10)
        .setIn(['from'], state.getIn(['from']) + 30);
    case CONSTANTS.CARE_PACKAGES_FILTER_ERROR:
      return state.setIn(['loading'], false);
    case CONSTANTS.SET_DISPLAY_FEED_COUNT:
      return state.setIn(['countDisplay'], state.getIn(['countDisplay']) + 10);
    case CONSTANTS.INIT_PACKAGELIST_DATA:
      return state.setIn(['filteredPackages'], [])
        .setIn(['loading'], false)
        .setIn(['from'], 0)
        .setIn(['countDisplay'], 0);
    default:
  }

  return state;
}

export default packagesFilterReducer;
