import _ from 'lodash';

export type UserProps = {
  email: string;
  name: string;
};

export const userModel = (_model?: UserProps): UserProps => ({
  email: _.get(_model, 'email', ''),
  name: _.get(_model, 'name', ''),
});
