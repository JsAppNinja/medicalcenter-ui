import React, { Component } from 'react';
import { updateQuery, getQuery } from 'browserHistory';
import capitalize from 'lodash/capitalize';
import mergeWith from 'lodash/mergeWith';
import merge from 'lodash/merge';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

function withQuery(name, defaultValues, useMerge = true) {
  return (WrappedComponent) => (
    class extends Component {
      constructor(...args) {
        super(...args);

        const query = getQuery() || {};
        let queryData = {};

        if (useMerge) {
          queryData = isObject(query[name]) ?
            mergeWith({ ...defaultValues }, query[name], (objValue, srcValue) => { // eslint-disable-line
              if (isArray(objValue) || isObject(objValue)) {
                return srcValue;
              }
            }) :
            merge({ [name]: defaultValues }, query)[name];
        } else {
          queryData = query[name] || defaultValues;
        }

        this.state = { queryData };
      }

      onChange = (data) => {
        const nextQuery = {};

        if (!data && data !== false && data !== 0) {
          nextQuery[name] = null;
        } else {
          nextQuery[name] = data;
        }

        updateQuery(nextQuery);
      }

      render() {
        const capName = capitalize(name);
        const newProps = {
          [`query${capName}Data`]: this.state.queryData,
          [`on${capName}QueryChange`]: this.onChange,
        };

        return <WrappedComponent {...newProps} {...this.props} />;
      }
    }
  );
}

export default withQuery;
