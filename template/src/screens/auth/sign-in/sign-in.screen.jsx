import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { RegisterLink, ForgotPasswordLink } from '../../../components/atoms';
import { SignInForm } from '../../../components/forms';

import { userAuthService } from '../../../services';
import { signInModel } from '../../../models';
import { isAuthenticatedFlowAction } from '../../../reducers/app-reducer/app.actions';

const SignInScreen = () => {
  const dispatch = useDispatch();

  const _onSignInSuccess = () => {
    dispatch(isAuthenticatedFlowAction());
  };
  return (
    <View style={styles.pageWrapper}>
      <View style={styles.placeHolder} />
      <SignInForm
        submitForm={userAuthService.signIn}
        onSuccess={_onSignInSuccess}
        initialValues={signInModel()}
      />
      <RegisterLink containerStyle={styles.registerLink} />
      <ForgotPasswordLink containerStyle={styles.forgotPasswordLink} />
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPasswordLink: {
    marginBottom: 30,
  },
  pageWrapper: {
    flexGrow: 1,
  },
  placeHolder: {
    flexGrow: 0.6,
  },
  registerLink: {
    marginVertical: 20,
  },
});

export default SignInScreen;
