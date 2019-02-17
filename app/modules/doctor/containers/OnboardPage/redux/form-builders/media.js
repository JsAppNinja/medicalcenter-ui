import { makeSelectOnboardDoctorProfile } from '../selectors';

export default function getMedia(state) {
  const profile = makeSelectOnboardDoctorProfile()(state);
  return {
    images: profile.get('images').toJS(),
    videos: profile.get('videos').toJS(),
  };
}
