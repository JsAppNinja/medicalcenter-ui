import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';

const selectAuth = () => (state) => state.get('auth');
const loginSelector = formValueSelector('login-form');
const signupSelector = formValueSelector('signup-form');

const makeSelectAuthUser = () => createSelector(
  selectAuth(),
  (authState) => authState.get('user')
);

const makeSelectAuthLoading = () => createSelector(
  selectAuth(),
  (authState) => authState.get('loading')
);


export {
  makeSelectAuthUser,
  makeSelectAuthLoading,
  loginSelector,
  signupSelector,
};
