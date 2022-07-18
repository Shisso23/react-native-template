import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';

import { RegisterLink, ForgotPasswordLink } from '../../../atoms';
import { SignInForm } from '../../../molecules';
import { FormScreenContainer } from '../../../templates';
import { isAuthenticatedFlowAction } from '../../../../reducers/app-reducer/app.actions';
import { userAuthService } from '../../../../services';
import { signInModel } from '../../../../models';

export const SignInScreen: React.FC = () => {
  const dispatch = useDispatch();

  const _onSignInSuccess = () => {
    dispatch(isAuthenticatedFlowAction());
  };

  return (
    <FormScreenContainer>
      <View style={tw`m-2`}>
        <SignInForm
          submitForm={userAuthService.signIn}
          onSuccess={_onSignInSuccess}
          initialValues={signInModel()}
        />
      </View>
      <RegisterLink containerStyle={tw`my-4`} />
      <ForgotPasswordLink />
    </FormScreenContainer>
  );
};
