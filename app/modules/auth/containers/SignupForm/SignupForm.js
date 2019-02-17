import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form/immutable';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import ReduxFormFields from 'components/ReduxFormFields';
import Alert from 'react-bootstrap/lib/Alert';
import { auth, db } from 'utils/firebase';
import {
  isRequired,
  isEmail,
  isPhone,
  isPasswordMatch,
} from 'utils/redux-form-validators';

import './style.scss';

class SignupForm extends Component {
  onSubmit = (values) => {
    const email = values.get('email');
    const firstName = values.get('firstName');
    const lastName = values.get('lastName');
    const phone = values.get('phone');
    const password = values.get('password');

    return auth.doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        const id = authUser.user.uid;

        return db.doCreateUser({
          id,
          email,
          firstName,
          lastName,
          phone,
        });
      })
      .then(() => {
        this.props.reset();
        this.props.onSubmit();
      })
      .catch(() => {
        throw new SubmissionError({
          _error: 'There was problem with sign up.',
        });
      });
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;

    return (
      <Form className="signup-form" onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="firstName"
          component={ReduxFormFields.Input}
          type="text"
          label="First Name"
          placeholder="John"
          validate={[isRequired]}
        />
        <Field
          name="lastName"
          component={ReduxFormFields.Input}
          type="text"
          label="Last Name"
          placeholder="Appleseed"
          validate={[isRequired]}
        />
        <Field
          name="email"
          component={ReduxFormFields.Input}
          type="email"
          label="Email Address"
          placeholder="johnappleseed@email.com"
          validate={[isRequired, isEmail]}
        />
        <Field
          name="phone"
          component={ReduxFormFields.Input}
          type="text"
          label="Phone Number"
          placeholder="12345678901"
          validate={[isRequired, isPhone]}
        />
        <Field
          name="password"
          component={ReduxFormFields.Password}
          type="text"
          label="Password"
          validate={[isRequired, isPasswordMatch]}
        />
        <Field
          name="password_confirmation"
          component={ReduxFormFields.Password}
          type="text"
          label="Password Confirmation"
          validate={[isRequired]}
        />
        {error &&
          <Alert bsStyle="danger">
            {error}
          </Alert>}
        <Button type="submit" bsSize="lg" bsStyle="primary" className="btn-block" disabled={submitting}>
          {submitting ? 'Processing...' : 'Sign up'}
        </Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'signup-form',
})(SignupForm);
