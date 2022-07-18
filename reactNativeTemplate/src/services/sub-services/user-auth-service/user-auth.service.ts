import _ from 'lodash';
import authUrls from './user-auth.urls';
import authUtils from './user-auth.utils';
import networkService from '../network-service/network.service';
import {
  apiRegistrationUserModel,
  registrationUserModel,
  apiForgotPasswordModel,
  forgotPasswordModel,
  apiSignInModel,
  RegisterProps,
  SignInProps,
  ForgotPasswordProps,
} from '../../../models';

const signIn = (formData: SignInProps) => {
  const signInUrl = authUrls.tokenUrl();
  const apiDto = apiSignInModel(formData);
  const oAuthData = authUtils.constructOAuthSignInData(apiDto);

  return networkService.post(signInUrl, oAuthData).then(authUtils.storeAccessAndRefreshTokens);
};

const signOut = () => {
  return authUtils.removeAccessAndRefreshTokens();
};

const register = (formData: RegisterProps) => {
  const registerUrl = authUrls.registerUrl();
  const apiDto = apiRegistrationUserModel(formData);

  return networkService.post(registerUrl, apiDto).catch((err) => {
    err.errors = registrationUserModel(err.errors);
    return Promise.reject(err);
  });
};

const forgotPassword = (formData: ForgotPasswordProps) => {
  const forgotPasswordUrl = authUrls.forgotPasswordUrl();
  const apiDto = apiForgotPasswordModel(formData);

  return networkService.post(forgotPasswordUrl, apiDto).catch((err) => {
    err.errors = forgotPasswordModel(err.errors);
    return Promise.reject(err);
  });
};

const doTokensExistInLocalStorage = () => {
  const _trueIfBothExist = (accessToken: string, refreshToken: string) =>
    !_.isNull(accessToken) && !_.isNull(refreshToken);

  return authUtils
    .getAccessAndRefreshTokens()
    .then(([accessToken, refreshToken]) => _trueIfBothExist(accessToken, refreshToken));
};

export default {
  signIn,
  signOut,
  register,
  forgotPassword,
  doTokensExistInLocalStorage,
};
