import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

function saveItem(key, value) {
    let saveValue = value;
    if (_.isObject(value)) {
        saveValue = JSON.stringify(value);
    }
    return AsyncStorage.setItem(key, saveValue)
        .then(() => {
            return saveValue;
        })
        .catch((error) =>
            console.warn(`WARNING: Failed to save item with key: ${key}. Error: ${error.message}`)
        );
}

function getItem(key) {
    return AsyncStorage.getItem(key)
        .then((value) => {
            try {
                return JSON.parse(value);
            } catch (error) {
                return value;
            }
        })
        .catch((error) => {
            console.warn(`WARNING: Failed to get item with key: ${key}. Error: ${error.message}`);
            return null;
        });
}

function removeItem(key) {
    return AsyncStorage.removeItem(key).catch((error) => {
        console.warn(`WARNING: Failed to remove item with key: ${key}. Error: ${error.message}`);
        return null;
    });
}

export default {
    saveItem,
    getItem,
    removeItem
};
