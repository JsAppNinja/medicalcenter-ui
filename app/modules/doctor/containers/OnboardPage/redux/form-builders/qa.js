import { qaSelector } from '../selectors';

export default function getQA(state) {
  return {
    qa_list: qaSelector(state, 'qa_list').toJS(),
  };
}
