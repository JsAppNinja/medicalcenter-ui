import { makeSelectOnboardDoctorProfile } from '../selectors';

export default function getBundles(state) {
  const profile = makeSelectOnboardDoctorProfile()(state);
  return {
    bundles: profile.get('bundles').toJS(),
  };
}
