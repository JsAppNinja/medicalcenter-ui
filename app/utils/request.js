import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, method = 'GET', body = null, includeToken = false, isAPI = true, isFile = false) { // eslint-disable-line
  let requestUrl = url;
  const options = { method };
  let headers = { 'content-type': 'application/json' };

  if (isFile) {
    headers = {};
  }

  if (isAPI) {
    requestUrl = `/api/${url}`;
  }
  if (method === 'GET' && body) {
    const queryString = Object.keys(body)
      .map((k) => (`${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`))
      .join('&');
    requestUrl += `?${queryString}`;
  } else if (body) {
    if (isFile) {
      const formData = new FormData();
      formData.append('file', body, body.name === 'blob' || !body.name ? 'image.jpg' : body.name);
      options.body = formData;
    } else {
      options.body = JSON.stringify(body);
    }
  }

  console.log('---request func-options: ', options);

  return fetch(requestUrl, {
    ...options,
    headers,
  })
    .then(checkStatus)
    .then(parseJSON);
}
