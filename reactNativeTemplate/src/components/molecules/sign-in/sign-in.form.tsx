import React from 'react';
import { Button } from '@rneui/themed';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { SignInProps } from '../../../models';
import { TextField } from '../../atoms';
import { emailSchema, passwordSchema } from '../form-validaton-schemas';
import { ErrorObject } from '../types';

type SignInFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: SignInProps;
};

const signInSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const SignInForm: React.FC<SignInFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const _handleFormSubmitError = (
    error: ErrorObject,
    actions: FormikHelpers<SignInProps>,
    formData: SignInProps,
  ) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else if (_.get(error, 'statusCode') === 400) {
      actions.setFieldError('email', 'Incorrect login credentials provided');
    } else {
      actions.setFieldError('email', _.get(error, 'message'));
    }
  };

  const _handleSubmission = (formData: SignInProps, actions: FormikHelpers<SignInProps>) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error: ErrorObject) => _handleFormSubmitError(error, actions, formData));
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={signInSchema}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <>
            <TextField name="email" label="Email" required keyboardType="email-address" />
            <TextField name="password" label="Password" required isSecure />
            <Button title="Login" onPress={handleSubmit} loading={isSubmitting} />
          </>
        );
      }}
    </Formik>
  );
};
