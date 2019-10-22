import userUrls from './user.urls';
import networkService, { defaultRequestConfig } from '../network-service/network.service';
import storageService from '../storage-service/storage.service';
import config from '../../../config';
import _ from 'lodash';

function signIn({ email, password }) {
    const data = {
        user: { email, password }
    };

    const url = userUrls.signInUrl();
    return networkService
        .doPost(url, data, { ...defaultRequestConfig, shouldThrowError: true })
        .then((response) => {
            const token = response.headers.authorization.replace('Bearer ', '');
            setUserToken(token);
        });
}

function signUp(user) {
    const data = {
        user
    };

    const url = userUrls.signUpUrl();
    return networkService.doPost(url, data, { ...defaultRequestConfig, shouldThrowError: true });
}

function signOut() {
    const url = userUrls.signOutUrl();

    return networkService
        .doDelete(url, { ...defaultRequestConfig, shouldThrowError: true })
        .then(() => {
            removeUserToken();
        });
}

function setUserToken(token) {
    return storageService.saveItem(config.tokenKey, token);
}

function getUserToken() {
    return storageService.getItem(config.tokenKey);
}

function removeUserToken() {
    return storageService.removeItem(config.tokenKey);
}

function isSignedIn() {
    return getUserToken().then((userToken) => {
        return !_.isNil(userToken);
    });
}

export default { signIn, signUp, signOut, getUserToken, isLoggedIn: isSignedIn };
