import { combineReducers } from 'redux-immutable';

import doctorsReducer from '../containers/RenderDoctors/redux/reducers';

const homeReducer = combineReducers({
  doctors: doctorsReducer,
});

export default homeReducer;
