import { firebase } from '@react-native-firebase/app';
import '@react-native-firebase/crashlytics';

export default {
    log: (message) => {
        firebase.crashlytics().log(message);
    }
};
