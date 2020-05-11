import userUrls from './user.urls';
import networkService, { defaultRequestConfig } from '../network-service/network.service';
import storageService from '../storage-service/storage.service';
import config from '../../../config';
import _ from 'lodash';
import base64 from 'base-64';

function signIn({ login, password }) {
    const data = {
        login,
        password,
        grant_type: 'password',
        client_id: config.clientId,
        client_secret: config.clientSecret
    };

    return getTokens(data);
}

function refresh() {
    return getUserToken(config.refreshTokenKey).then((refreshToken) => {
        return getTokens({
            grant_type: 'refresh_token',
            client_id: config.clientId,
            client_secret: config.clientSecret,
            refresh_token: refreshToken
        }).catch((error) => {
            console.warn('Failed to refresh token:', error);
            throw error;
        });
    });
}

function getTokens(data) {
    const url = userUrls.getTokenUrl();

    return networkService
        .doPost(url, data, { ...defaultRequestConfig, shouldThrowError: true }, false)
        .then((response) => {
            const tokens = [
                {
                    name: config.accessTokenKey,
                    value: _.get(response, `data.${config.accessTokenKey}`)
                },
                {
                    name: config.refreshTokenKey,
                    value: _.get(response, `data.${config.refreshTokenKey}`)
                }
            ];

            return setUserTokens(tokens).then(() => _.get(response, 'data'));
        });
}

function signUp(user) {
    const data = {
        [config.userModelName]: user
    };

    const url = userUrls.signUpUrl();
    return networkService.doPost(url, data, { ...defaultRequestConfig, shouldThrowError: true });
}

function signOut() {
    return removeUserToken();
}

function setUserTokens(tokens) {
    return Promise.all(
        tokens.map((token) =>
            storageService.setItem(_.get(token, 'name'), _.get(token, 'value', ''))
        )
    );
}

function getUserToken(key) {
    return storageService.getItem(key);
}

function removeUserToken() {
    return Promise.all(getTokenKeyArray().map((token) => storageService.removeItem(token)));
}

function getTokenKeyArray() {
    return [config.accessTokenKey, config.refreshTokenKey];
}

async function parseUserToken() {
    return getUserToken(config.accessTokenKey)
        .then((token) => {
            if (!token) {
                return undefined;
            }

            const base64Url = token.split('.')[1];
            const base64Data = base64Url.replace('-', '+').replace('_', '/');

            return JSON.parse(base64.decode(base64Data));
        })
        .catch((error) => console.warn(error));
}

const getUserId = () => {
    return parseUserToken()
        .then((tokenData) => {
            return _.get(tokenData, `${config.tokenUserKey}.id`);
        })
        .catch((error) =>
            console.warn(`There was an error while decoding the user token: ${error.message}`)
        );
};

function isSignedIn() {
    return getUserToken(config.accessTokenKey).then((userToken) => {
        return !_.isNil(userToken);
    });
}

function sendOtp() {
    const url = userUrls.sendOtpUrl();
    return networkService.doGet(url, { ...defaultRequestConfig, shouldThrowError: true }, false);
}

function verifyOtp(otp) {
    const url = userUrls.verifyOtpUrl();
    return networkService.doPost(
        url,
        { otp },
        { ...defaultRequestConfig, shouldThrowError: true },
        false
    );
}

function getUser() {
    const url = userUrls.getUser();
    return networkService.doGet(url, { ...defaultRequestConfig, shouldThrowError: true }, false);
}

function forgotPassword(login) {
    const url = userUrls.forgotPassword();
    return networkService.doPost(
        url,
        { login },
        { ...defaultRequestConfig, shouldThrowError: true },
        false
    );
}

function resetPassword(token, password) {
    const url = userUrls.resetPassword();
    return networkService.doPost(
        url,
        { token, password },
        { ...defaultRequestConfig, shouldThrowError: true },
        false
    );
}

export default {
    signIn,
    signUp,
    signOut,
    refresh,
    getUserToken,
    isSignedIn,
    parseUserToken,
    getUserId,
    sendOtp,
    verifyOtp,
    getUser,
    forgotPassword,
    resetPassword
};
