import { aboutInfoSelector } from '../selectors';

export default function getAbout(state) {
  return {
    phone: aboutInfoSelector(state, 'phone'),
    website: aboutInfoSelector(state, 'website'),
    education: aboutInfoSelector(state, 'education').toJS(),
    hospital_affiliates: aboutInfoSelector(state, 'hospitalAffiliates').toJS(),
    languages: aboutInfoSelector(state, 'languages').toJS(),
    board_certifications: aboutInfoSelector(state, 'boardCertifications').toJS(),
    memberships: aboutInfoSelector(state, 'professionalMembership').toJS(),
    awards: aboutInfoSelector(state, 'awards').toJS(),
    media_publications: aboutInfoSelector(state, 'publications').toJS(),
  };
}
