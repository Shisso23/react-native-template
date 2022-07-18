import React from 'react';

import { FormScreenContainer } from '../../../index';
import { RegisterForm } from '../../../molecules';
import { userAuthService } from '../../../../services';
import { registrationUserModel } from '../../../../models';

export const RegisterScreen: React.FC = () => {
  const _onFormSuccess = () => {};

  return (
    <FormScreenContainer>
      <RegisterForm
        submitForm={userAuthService.register}
        onSuccess={_onFormSuccess}
        initialValues={registrationUserModel()}
      />
    </FormScreenContainer>
  );
};
