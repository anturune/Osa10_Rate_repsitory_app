import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        // Get the access token for the storage
        const accessToken = await AsyncStorage.getItem(
            `${this.namespace}:accessToken`,
        );
        console.log('IS TOKEN IN STORAGE utils/authStorage.js', accessToken);

        return accessToken ? JSON.parse(accessToken) : '';
    }

    async setAccessToken(accessToken) {
        // Add the access token to the storage
        console.log('TULEEKO setAccessTokeniin', accessToken);
        const newAccessToken = accessToken;

        await AsyncStorage.setItem(
            `${this.namespace}:accessToken`,
            JSON.stringify(newAccessToken),
        );
    }

    async removeAccessToken() {
        // Remove the access token from the storage
        console.log('TULEEKO removeAccessTokeniin');
        await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    }

}

export default AuthStorage;