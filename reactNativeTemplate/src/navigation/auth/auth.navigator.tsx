import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignInScreen, RegisterScreen, ForgotPasswordScreen } from '../../components';
import { useTheme } from '../../hooks';
import { AuthStackList } from './types';

const AuthStack = createStackNavigator<AuthStackList>();

export const AuthNavigator = () => {
  const { Navigator } = useTheme();

  return (
    <AuthStack.Navigator screenOptions={Navigator.globalNavigatorScreenOptions}>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: 'Sign In',
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Forgot Password' }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Register' }}
      />
    </AuthStack.Navigator>
  );
};
