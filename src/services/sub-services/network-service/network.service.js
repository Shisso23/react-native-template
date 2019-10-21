import axios from 'axios';
import _ from 'lodash';

import NetworkError from './network-error';
import { userService } from '../../services';

export const defaultRequestConfig = {
    shouldThrowError: true,
    requestConfig: {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    }
};

function doGet(url, config) {
    return getUserTokenConfig(config).then((defaultConfig) => {
        const { requestConfig, responseManipulator, shouldThrowError } = _.merge(
            defaultConfig,
            config
        );

        return axios
            .get(url, requestConfig)
            .then((response) => responseManipulator(response))
            .catch((error) => networkErrorHandler(error, url, shouldThrowError));
    });
}

function doPost(url, data, config) {
    return getUserTokenConfig(config).then((defaultConfig) => {
        const { requestConfig, shouldThrowError, responseManipulator } = _.merge(
            defaultConfig,
            config
        );

        return axios
            .post(url, data, requestConfig)
            .then((response) => responseManipulator(response))
            .catch((error) => networkErrorHandler(error, url, shouldThrowError));
    });
}

function doPut(url, data, config) {
    return getUserTokenConfig(config).then((defaultConfig) => {
        const { requestConfig, shouldThrowError } = _.merge(defaultConfig, config);

        return axios
            .put(url, data, requestConfig)
            .catch((error) => networkErrorHandler(error, url, shouldThrowError));
    });
}

function doDelete(url, config) {
    return getUserTokenConfig(config).then((defaultConfig) => {
        const { requestConfig, shouldThrowError } = _.merge(defaultConfig, config);

        return axios
            .delete(url, requestConfig)
            .catch((error) => networkErrorHandler(error, url, shouldThrowError));
    });
}

function getUserTokenConfig() {
    return userService.getUserToken().then((userToken) => {
        const config = {
            responseManipulator: (response) => ({ data: response.data, headers: response.headers }),
            shouldThrowError: true
        };

        if (userToken) {
            return _.merge({ requestConfig: { auth: userToken } }, config);
        }

        return config;
    });
}

function networkErrorHandler(error, url, shouldThrowError) {
    console.warn(`WARNING: ${error.message}\nURL: ${url}`);
    if (shouldThrowError) {
        throw new NetworkError(error.response.status, error.response.data);
    }
}

function getRequestConfigObject(headers = {}) {
    return {
        requestConfig: {
            headers
        }
    };
}

export default {
    doGet,
    doPost,
    doPut,
    doDelete,
    getRequestConfigObject
};
