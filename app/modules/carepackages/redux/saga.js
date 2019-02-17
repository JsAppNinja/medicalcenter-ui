import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import * as CONSTANTS from './constants';
import {
  packagesFilterSuccess,
  packagesFilterError,
} from './actions';

export function* packagesFilterRequest(action) {
  const {
    joint,
    from,
  } = action.searchOptions;

  const { isResetSearch, filterName } = action;
  const limitNumber = 30;
  let reqUrl = `packages?limit=${limitNumber}&from=${from}`;
  if (filterName) {
    reqUrl = `packages?keyword=${filterName}&limit=${limitNumber}&from=${from}`;
  } else if (joint) {
    reqUrl = `packages?cat=${joint}&limit=${limitNumber}&from=${from}`;
  }

  try {
    const data = yield call(request, reqUrl, 'GET', null, true);
    yield put(packagesFilterSuccess(data.packages, isResetSearch));
  } catch (err) {
    yield put(packagesFilterError(err));
  }
}

export default function* packagesFilterSaga() {
  yield takeLatest(CONSTANTS.CARE_PACKAGES_FILTER_REQUEST, packagesFilterRequest);
}
