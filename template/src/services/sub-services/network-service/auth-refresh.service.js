// Inspired by axios-auth-refresh: https://github.com/Flyrell/axios-auth-refresh/blob/master/src/index.js
// Adapted to suite the HOMii Network Service use case.

import _ from 'lodash';

import userService from '../user-service/user.service';
import userUrls from '../user-service/user.urls';

function createAuthRefreshInterceptor(axios) {
    const interceptorId = axios.interceptors.response.use(
        (response) => response,
        (error) => {
            console.warn(`WARNING: ${error.message}\nURL: ${_.get(error, 'config.url')}`);
            if (
                error.response.status !== 401 ||
                (error.response.status === 401 &&
                    _.get(error, 'config.url') === userUrls.getTokenUrl())
            ) {
                throw error;
            }

            axios.interceptors.response.eject(interceptorId);

            const refreshCall = userService.refresh();

            const requestQueueInterceptorId = axios.interceptors.request.use((request) => {
                if (_.get(request, 'url') === userUrls.getTokenUrl()) {
                    return request;
                }
                return refreshCall.then(() => request);
            });

            console.warn('Refreshing access token');

            return refreshCall
                .then((data) => {
                    axios.interceptors.request.eject(requestQueueInterceptorId);
                    const requestConfig = _.get(error, 'response.config');
                    if (!requestConfig) {
                        throw error;
                    }
                    requestConfig.headers.Authorization = `Bearer ${_.nth(data, 0)}`;
                    return axios.request(requestConfig);
                })
                .catch((error) => {
                    axios.interceptors.request.eject(requestQueueInterceptorId);
                    return Promise.reject(error);
                })
                .finally(() => createAuthRefreshInterceptor(axios));
        }
    );
    return axios;
}

export default createAuthRefreshInterceptor;
