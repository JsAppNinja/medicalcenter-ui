import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db, firebase } from 'utils/firebase';
import { authUserSet, authUserLoading } from 'modules/auth/redux/actions';

const withAuthentication = (WrappedComponent) => {
  class WithAuthentication extends Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props;
      authUserLoading(true);

      firebase.auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          db.doGetProfile(authUser.uid)
            .then((user) => {
              if (user) {
                onSetAuthUser(user);
              } else {
                authUserLoading(false);
              }
            });
        } else {
          onSetAuthUser(null);
        }
      });
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  const mapDispatchToProps = {
    onSetAuthUser: authUserSet,
    onSetLoading: authUserLoading,
  };

  return connect(null, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
