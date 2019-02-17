import { combineReducers } from 'redux-immutable';

import recentViewedDoctorsReducer from '../../RecentViewedDoctors/redux/reducers';
import topProvidersReducer from '../../TopProviders/redux/reducers';
import saveDoctorModalReducer from '../../SaveDoctorModal/redux/reducers';
import autocompleteReducer from '../../AutocompleteSearchDoctors/redux/reducers';

const globalReducer = combineReducers({
  recentViewedDoctors: recentViewedDoctorsReducer,
  topProviders: topProvidersReducer,
  saveDoctorModal: saveDoctorModalReducer,
  autocomplete: autocompleteReducer,
});

export default globalReducer;
