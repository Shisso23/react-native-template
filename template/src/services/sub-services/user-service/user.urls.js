import config from '../../../config';

const apiBaseUrl = config.apiUrl;
const userBaseUrl = `${apiBaseUrl}/users`;

export default {
    signInUrl: () => `${userBaseUrl}/sign_in`,
    signUpUrl: () => `${userBaseUrl}/`,
    signOutUrl: () => `${userBaseUrl}/sign_out`
};
