import React, { Component } from 'react';
import PageLoading from 'components/PageLoading';

function loadable(WrappedComponent) {
  return class extends Component {
    render() {
      const { isLoading } = this.props;

      if (isLoading) {
        return <PageLoading />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}

export default loadable;
