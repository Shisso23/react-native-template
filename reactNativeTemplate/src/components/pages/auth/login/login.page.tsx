import React from 'react';
import tw from 'twrnc';

import { RegisterLink, ForgotPasswordLink } from '../../../atoms';
import { LoginForm } from '../../../molecules';
import { FormScreenTemplate } from '../../../templates';

export const LoginPage = () => (
  <FormScreenTemplate>
    <LoginForm />
    <RegisterLink containerStyle={tw`my-4`} />
    <ForgotPasswordLink />
  </FormScreenTemplate>
);
