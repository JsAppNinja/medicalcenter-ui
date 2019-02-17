import { basicInfoSelector, avatarSelector } from '../selectors';

export default function getBasicInformation(state) {
  return {
    name: basicInfoSelector(state, 'name'),
    title: basicInfoSelector(state, 'title'),
    experience: basicInfoSelector(state, 'experience'),
    zipcode: basicInfoSelector(state, 'zipcode'),
    city: basicInfoSelector(state, 'city'),
    state: basicInfoSelector(state, 'state'),
    country: basicInfoSelector(state, 'country'),
    bio: basicInfoSelector(state, 'bio'),
    specialities: basicInfoSelector(state, 'specialities').toJS(),
    photo_url: avatarSelector()(state) || undefined,
  };
}
