/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import global from 'containers/App/redux/reducers';
import language from 'containers/LanguageProvider/reducer';
import loginModal from 'containers/LoginModal/redux/reducers';
import signupModal from 'containers/SignupModal/redux/reducers';
import navbarPolicyLabel from 'containers/StaticPage/redux/reducers';
import home from 'modules/home/redux/reducers';
import auth from 'modules/auth/redux/reducers';
import doctor from 'modules/doctor/redux/reducers';
import doctorfeed from 'modules/doctorfeed/redux/reducers';
import carepackages from 'modules/carepackages/redux/reducers';
import contact from 'modules/contact-us/redux/reducers';
import partner from 'containers/PartnerFormModal/redux/reducers';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    language,
    home,
    auth,
    doctor,
    doctorfeed,
    carepackages,
    partner,
    contact,
    global,
    loginModal,
    signupModal,
    navbarPolicyLabel,
    form: formReducer,
    ...injectedReducers,
  });
}
