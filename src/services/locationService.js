import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude, accuracy } =
                    position.coords;

                resolve({
                    latitude,
                    longitude,
                    accuracy,
                    timestamp: position.timestamp,
                });
            },
            error => {
                reject(
                    new Error(
                        error.message ||
                        'Unable to retrieve your location.',
                    ),
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            },
        );
    });
};