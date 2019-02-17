import { createSelector } from 'reselect';
import { getCurrency } from 'utils/currency';

const selectDoctor = () => (state) => state.get('doctor');

const makeSelectDoctorProfile = () => createSelector(
  selectDoctor(),
  (doctorState) => doctorState.get('profile')
);

const makeSelectDoctorProfileLoading = () => createSelector(
  selectDoctor(),
  (doctorState) => doctorState.get('loading')
);

const makeSelectDoctorReviews = () => createSelector(
  makeSelectDoctorProfile(),
  (profileState) => profileState.get('review_list')
);

const makeSelectDoctorIsPaid = () => createSelector(
  selectDoctor(),
  (doctorState) => {
    const paid = doctorState.getIn(['profile', 'paid']);

    return paid;
  }
);

const selectBundlePrice = () => (state, props) => {
  if (props.price) {
    return props.price;
  }

  if (!props.match || !props.match.params) {
    return '';
  }

  const bundles = state.getIn(['doctor', 'profile', 'bundles']);
  const bundle = bundles.find((b) => b.get('uuid') === props.match.params.bundleUUID);

  if (bundle) {
    return getCurrency(bundle.get('consult_price'));
  }

  return '';
};

const makeSelectFeaturedReview = () => createSelector(
  selectDoctor(),
  (doctorState) => {
    const reviews = doctorState.getIn(['profile', 'review_list']);

    if (!reviews) {
      return null;
    }

    return reviews.find((review) => review.get('preferred')) ||
      reviews.get(0);
  },
);

const makeSelectFeaturedVideo = () => createSelector(
  selectDoctor(),
  (doctorState) => {
    const reviews = doctorState.getIn(['profile', 'videos']);

    if (!reviews) {
      return null;
    }

    return reviews.find((review) => review.get('featured')) ||
      reviews.get(0);
  },
);

const makeSelectSocialModalShow = () => createSelector(
  selectDoctor(),
  (doctorState) => doctorState.get('socialModal'),
);

const makeSelectShareVideoIndex = () => createSelector(
  selectDoctor(),
  (doctorState) => doctorState.get('shareVideoIndex'),
);

const makeSelectClaimed = () => createSelector(
  selectDoctor(),
  (doctorState) => doctorState.get('claimed'),
);


export {
  selectDoctor,
  makeSelectDoctorProfile,
  makeSelectDoctorIsPaid,
  makeSelectDoctorProfileLoading,
  makeSelectFeaturedVideo,
  makeSelectDoctorReviews,
  makeSelectFeaturedReview,
  makeSelectSocialModalShow,
  makeSelectShareVideoIndex,
  selectBundlePrice,
  makeSelectClaimed,
};
