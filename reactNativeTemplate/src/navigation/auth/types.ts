import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackList = {
  SignIn: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  TermsAndConditions: undefined;
};

export type AuthStackProps = StackNavigationProp<AuthStackList>;
