import {
    API_URL,
    API_VERSION,
    APP_DISPLAY_NAME,
    APP_NAME,
    CLIENT_ID,
    CLIENT_SECRET
} from 'react-native-dotenv';

export default {
    name: APP_NAME,
    displayName: APP_DISPLAY_NAME,
    apiUrl: API_URL,
    apiUrlWithVersion: `${API_URL}/api/${API_VERSION}`,

    accessTokenKey: 'access_token',
    refreshTokenKey: 'refresh_token',
    tokenKey: 'kunnek:jwt',
    tokenUserKey: 'user',

    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,

    userModelName: 'user'
};
