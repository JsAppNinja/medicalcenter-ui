import { blogSelector } from '../selectors';

export default function getBlog(state) {
  return {
    articles: blogSelector(state, 'articles').toJS(),
  };
}
