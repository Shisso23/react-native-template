import React from 'react';
import { Text } from 'react-native';
import { Button } from '@rneui/themed';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { emailSchema } from '../form-validaton-schemas';
import { ErrorObject } from '../types';
import { UserProps } from '../../../models';
import { TextField } from '../../atoms';

type ProfileFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: UserProps;
};

const profileSchema = Yup.object().shape({
  email: emailSchema,
  name: Yup.string().required('Name is required'),
});

export const ProfileForm: React.FC<ProfileFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const _handleSubmission = (formData: UserProps, actions: FormikHelpers<UserProps>) => {
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
      validationSchema={profileSchema}
      enableReinitialize
    >
      {({ handleSubmit, values, isSubmitting }) => {
        return (
          <>
            <TextField name="email" label="Email" required keyboardType="email-address" />
            <TextField name="name" label="Name" required />
            <Button title="Update" onPress={handleSubmit} loading={isSubmitting} />
            {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
          </>
        );
      }}
    </Formik>
  );
};
