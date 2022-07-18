import React from 'react';
import { Text } from 'react-native';
import { Button } from '@rneui/themed';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { TextField } from '../../atoms';
import { ForgotPasswordProps } from '../../../models';
import { emailSchema } from '../form-validaton-schemas';
import { ErrorObject } from '../types';

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
      {({ handleSubmit, values, isSubmitting }) => {
        return (
          <>
            <TextField name="email" label="Email" required />
            <Button title="Submit" onPress={handleSubmit} loading={isSubmitting} />
            {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
          </>
        );
      }}
    </Formik>
  );
};
