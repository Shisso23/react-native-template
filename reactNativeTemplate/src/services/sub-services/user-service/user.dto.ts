import _ from 'lodash';

export const userDTO = (formData = {}) => ({
  user: {
    email: _.get(formData, 'email', ''),
    name: _.get(formData, 'name', ''),
  },
});
