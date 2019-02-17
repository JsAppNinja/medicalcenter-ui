import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import ReduxFormFields from 'components/ReduxFormFields';
import { auth } from 'utils/firebase';
import {
  isRequired,
  isEmail,
} from 'utils/redux-form-validators';

import './style.scss';

class LoginForm extends Component {
  onSubmit = (values) => {
    const email = values.get('email');
    const password = values.get('password');

    return auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.reset();
        this.props.onSubmit();
      })
      .catch(() => {
        throw new SubmissionError({
          _error: 'Email and/or password is wrong',
        });
      });
  }

  render() {
    const { handleSubmit, error, submitting } = this.props;

    return (
      <Form className="login-form" onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="email"
          component={ReduxFormFields.Input}
          type="email"
          label="Email Address"
          placeholder="johnappleseed@email.com"
          validate={[isRequired, isEmail]}
        />
        <Field
          name="password"
          component={ReduxFormFields.Password}
          type="text"
          label="Password"
          validate={[isRequired]}
        />
        <Field
          name="rememberMe"
          component={ReduxFormFields.Checkbox}
          label="Remember Me"
        />
        {error &&
          <Alert bsStyle="danger">
            {error}
          </Alert>}
        <Button type="submit" bsSize="lg" bsStyle="primary" className="btn-block" disabled={submitting}>
          {submitting ? 'Processing...' : 'Sign In'}
        </Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'login-form',
})(LoginForm);
