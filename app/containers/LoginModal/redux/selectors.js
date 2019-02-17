import { createSelector } from 'reselect';

const selectLoginModal = () => (state) => state.getIn(['loginModal']);

const makeSelectLoginModalShow = () => createSelector(
  selectLoginModal(),
  (modalState) => modalState.get('show'),
);
export {
  selectLoginModal,
  makeSelectLoginModalShow,
};
