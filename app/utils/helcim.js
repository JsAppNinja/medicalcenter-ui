import 'whatwg-fetch';
import qs from 'qs';
import get from 'lodash/get';

const baseUrl = 'https://secure.myhelcim.com/js/';
const fieldNames = [
  'response',
  'responseMessage',
  'noticeMessage',
  'date',
  'time',
  'type',
  'amount',
  'cardHolderName',
  'cardNumber',
  'cardExpiry',
  'cardToken',
  'cardType',
  'transactionId',
  'avsResponse',
  'cvvResponse',
  'approvalCode',
  'orderNumber',
  'customerCode',
  'currency',
  'bankAccountType',
  'bankAccountCorporate',
  'bankAccountToken',
  'bankFinancialNumber',
  'bankTransitNumber',
  'bankAccountNumber',
  'xmlHash',
];

function parseXMLFields(xmlObject) {
  const result = {};
  fieldNames.forEach((field) => {
    const tmpValue = get(xmlObject.getElementsByTagName(field)[0], 'firstChild.nodeValue', '');
    if (tmpValue) {
      result[field] = tmpValue;
    }
  });

  return result;
}

export function fetchToken(formData) {
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };
  const payload = {
    ...formData,
    token: process.env.HELCIM_TOKEN,
    test: process.env.NODE_ENV !== 'production',
  };

  return fetch(baseUrl, {
    method: 'POST',
    body: qs.stringify(payload, { encodeValuesOnly: true, skipNulls: true }),
    headers,
  })
    .then((resp) => resp.text())
    .then((str) => (new window.DOMParser()).parseFromString(str, 'text/xml'))
    .then((xmlObject) => parseXMLFields(xmlObject));
}
