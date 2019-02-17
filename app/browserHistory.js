import createHistory from 'history/createBrowserHistory';
import qs from 'qs';
import isEqual from 'lodash/isEqual';
import mergeWith from 'lodash/mergeWith';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

const browserHistory = createHistory();

function getNewQuery(query) {
  const { location } = browserHistory;
  const { pathname, search } = location;
  const prevQuery = qs.parse(search, { ignoreQueryPrefix: true }) || {};
  const hasMutation = !isEqual(prevQuery, query);

  if (!hasMutation) {
    return { pathname, newQuery: null };
  }

  return {
    pathname,
    newQuery: mergeWith(prevQuery, query, (objValue, srcValue) => { // eslint-disable-line
      if (isArray(objValue) || isObject(objValue)) {
        return srcValue;
      }
    }),
  };
}

export function updateQuery(query) {
  const { pathname, newQuery } = getNewQuery(query);
  if (newQuery === null) return;
  browserHistory.replace({
    pathname,
    search: qs.stringify(newQuery, { encodeValuesOnly: true, skipNulls: true }),
  });
}

export function getQuery() {
  const { location } = browserHistory;
  return qs.parse(location.search, { ignoreQueryPrefix: true });
}

export function goToPage(pathname, params) {
  browserHistory.push({
    pathname,
    search: qs.stringify(params, { encodeValuesOnly: true, skipNulls: true }),
  });
}

export function buildURL(pathname, params) {
  const strParams = qs.stringify(params, { encodeValuesOnly: true, skipNulls: true });

  return `${pathname}?${strParams}`;
}

export default browserHistory;
