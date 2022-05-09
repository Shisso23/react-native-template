import { AxiosResponse } from 'axios';

import { userModel, UserProps } from '../../../models';
import authNetworkService from '../auth-network-service/auth-network.service';
import userUrls from './user.urls';
import { userDTO } from './user.dto';

const getUser = () => {
  const url = userUrls.userUrl();
  const _createAndReturnUserModel = (apiResponse: AxiosResponse): UserProps =>
    userModel(apiResponse.data);

  return authNetworkService
    .get(url)
    .then(_createAndReturnUserModel)
    .catch((error) => {
      return Promise.reject(error);
    });
};

const updateUser = (formData: UserProps) => {
  const url = userUrls.userUrl();
  const apiUser = userDTO(formData);

  return authNetworkService.patch(url, apiUser).catch((error) => {
    error.errors = userModel(error.errors);
    return Promise.reject(error);
  });
};

export default {
  getUser,
  updateUser,
};
