import getSymbolFromCurrency from 'currency-symbol-map';

export function getPriceObject(price) {
  let obj = price || '0';

  if (!isNaN(price)) { // eslint-disable-line
    obj = {
      currency: 'USD',
      unit: price,
      fractional_unit: '00',
    };
  } else if (typeof price === 'string') {
    try {
      obj = JSON.parse(price);
    } catch (e) {
      obj = {
        currency: 'USD',
        unit: price,
        fractional_unit: '00',
      };
    }
  }

  if (typeof obj === 'object' && typeof obj.toJS === 'function') {
    obj = price.toJS();
  }

  return obj;
}

export function getPrice(price) {
  return getPriceObject(price).unit;
}

export function getCurrency(price) {
  const obj = getPriceObject(price);
  return `${getSymbolFromCurrency(obj.currency)}${obj.unit}`;
}
