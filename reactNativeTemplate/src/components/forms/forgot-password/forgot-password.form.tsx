import React from 'react';
import { Text } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { emailSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { ErrorObject } from '../types';
import { ForgotPasswordProps } from '../../../models';

type ForgotPasswordFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: ForgotPasswordProps;
};

const forgotPasswordSchema = Yup.object().shape({
  email: emailSchema,
});

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const _handleSubmission = (
    formData: ForgotPasswordProps,
    actions: FormikHelpers<ForgotPasswordProps>,
  ) => {
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
      validationSchema={forgotPasswordSchema}
      enableReinitialize
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting,
        handleBlur,
        touched,
        status,
      }) => {
        const error = (name: string): string | undefined =>
          getFormError(name, { touched, status, errors });
        return (
          <>
            <Input
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              label="Email"
              errorMessage={error('email')}
            />
            <Button title="Submit" onPress={handleSubmit} loading={isSubmitting} />
            {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
          </>
        );
      }}
    </Formik>
  );
};
