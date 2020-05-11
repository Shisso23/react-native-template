import axios from 'axios';
import _ from 'lodash';
import NetworkError from './network-error';
import appConfig from '../../../config';
import { userService } from '../../services';
import createAuthRefreshInterceptor from './auth-refresh.service';

export const defaultRequestConfig = {
    shouldThrowError: true,
    requestConfig: {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    }
};

const axiosInstance = axios.create();

createAuthRefreshInterceptor(axiosInstance);

function doGet(url, config = defaultRequestConfig, mustAuthenticate = true) {
    return getRequestConfig(config, mustAuthenticate).then((defaultConfig) => {
        const { requestConfig, responseManipulator, shouldThrowError } = _.merge(
            defaultConfig,
            config
        );

        return axiosInstance
            .get(url, requestConfig)
            .then((response) => responseManipulator(response))
            .catch((error) => networkErrorHandler(error, url, shouldThrowError));
    });
}

function doPost(url, data, config = defaultRequestConfig, mustAuthenticate = true) {
    return getRequestConfig(config, mustAuthenticate).then((defaultConfig) => {
        const { requestConfig, shouldThrowError, responseManipulator } = _.merge(
            defaultConfig,
            config
        );

        return axiosInstance
            .post(url, data, requestConfig)
            .then((response) => responseManipulator(response))
            .catch((error) => networkErrorHandler(error, url, shouldThrowError));
    });
}

function doPut(url, data, config = defaultRequestConfig, mustAuthenticate = true) {
    return getRequestConfig(config, mustAuthenticate).then((defaultConfig) => {
        const { requestConfig, shouldThrowError } = _.merge(defaultConfig, config);

        return axiosInstance
            .put(url, data, requestConfig)
            .catch((error) => networkErrorHandler(error, url, shouldThrowError));
    });
}

function doDelete(url, config = defaultRequestConfig, mustAuthenticate = true) {
    return getRequestConfig(config, mustAuthenticate).then((defaultConfig) => {
        const { requestConfig, shouldThrowError } = _.merge(defaultConfig, config);

        return axiosInstance
            .delete(url, requestConfig)
            .catch((error) => networkErrorHandler(error, url, shouldThrowError));
    });
}

function networkErrorHandler(error, url, shouldThrowError) {
    console.warn(`WARNING: ${error.message}\nURL: ${url}`);
    if (shouldThrowError) {
        let response;
        try {
            response = JSON.parse(error.request.response);
        } catch (e) {
            response = { error: error.message };
        }
        throw new NetworkError(error.request.status, response);
    }
}

function getRequestConfig(defaultConfig, mustAuthenticate = true) {
    const config = {
        responseManipulator: (response) => ({
            data: _.get(response, 'data', {}),
            headers: _.get(response, 'headers', {})
        }),
        shouldThrowError: true,
        ...defaultConfig
    };

    if (mustAuthenticate) {
        return userService.getUserToken(appConfig.accessTokenKey).then((userToken) => {
            if (userToken) {
                return _.merge(
                    { requestConfig: { headers: { Authorization: `Bearer ${userToken}` } } },
                    config
                );
            }

            return config;
        });
    }

    return new Promise((resolve) => {
        resolve(config);
    });
}

export default {
    doGet,
    doPost,
    doPut,
    doDelete,
    getRequestConfig
};
