import React from 'react';

import { FormScreenContainer } from '../../../index';
import { ForgotPasswordForm } from '../../../molecules';
import { userAuthService } from '../../../../services';
import { forgotPasswordModel } from '../../../../models';

export const ForgotPasswordScreen: React.FC = () => {
  return (
    <FormScreenContainer>
      <ForgotPasswordForm
        submitForm={userAuthService.forgotPassword}
        initialValues={forgotPasswordModel()}
      />
    </FormScreenContainer>
  );
};
