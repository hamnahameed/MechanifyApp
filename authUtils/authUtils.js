import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTokenFromStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error getting token from AsyncStorage:', error);
        return null;
    }
};

export const getUserFromStorage = async () => {
    try {
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);
        return user;
    } catch (error) {
        console.error('Error getting user from AsyncStorage:', error);
        return {};
    }
};