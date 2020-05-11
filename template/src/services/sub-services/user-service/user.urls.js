import config from '../../../config';

const apiBaseUrl = config.apiUrl;
const userBaseUrl = `${apiBaseUrl}/users`;

export default {
    signUpUrl: () => `${userBaseUrl}/`,
    getTokenUrl: () => `${config.apiUrl}/oauth/token`,
    sendOtpUrl: () => `${config.apiUrlWithVersion}/send_otp`,
    verifyOtpUrl: () => `${config.apiUrlWithVersion}/verify_otp`,
    getUser: () => `${config.apiUrlWithVersion}/${config.userModelName}`,
    forgotPassword: () => `${config.apiUrlWithVersion}/forgot_password`,
    resetPassword: () => `${config.apiUrlWithVersion}/reset_password`
};
