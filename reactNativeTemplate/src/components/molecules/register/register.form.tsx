import React from 'react';
import { Text } from 'react-native';
import { Button } from '@rneui/themed';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import {
  emailSchema,
  registerPasswordSchema,
  confirmPasswordSchema,
  termsAndConditionsSchema,
} from '../form-validaton-schemas';
import { ErrorObject } from '../types';
import { TextField, TermsAndConditions } from '../../atoms';
import { RegisterProps } from '../../../models';

type RegisterFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: RegisterProps;
};

export const registerSchema = Yup.object().shape({
  email: emailSchema,
  name: Yup.string().required('Name is required'),
  password: registerPasswordSchema,
  confirmPassword: confirmPasswordSchema,
  termsAndConditions: termsAndConditionsSchema,
});

export const RegisterForm: React.FC<RegisterFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const _handleSubmission = (formData: RegisterProps, actions: FormikHelpers<RegisterProps>) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error: ErrorObject) => {
        actions.setSubmitting(false);
        if (_.get(error, 'statusCode') === 422) {
          const apiErrors = error.errors;
          actions.resetForm({ values: formData, status: { apiErrors } });
        }
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={registerSchema}
      enableReinitialize
    >
      {({ handleSubmit, values, isSubmitting, setFieldValue }) => {
        return (
          <>
            <TextField name="email" label="Email" required keyboardType="email-address" />
            <TextField name="name" label="Name" required />
            <TextField name="password" label="Password" required isSecure />
            <TextField name="confirmPassword" label="Confirm Password" required isSecure />
            <Button title="Register" onPress={handleSubmit} loading={isSubmitting} />
            <TermsAndConditions
              checked={values.termsAndConditions}
              onPress={() => setFieldValue('termsAndConditions', !values.termsAndConditions)}
            />
            {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
          </>
        );
      }}
    </Formik>
  );
};
