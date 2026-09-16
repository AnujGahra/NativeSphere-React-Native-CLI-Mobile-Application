export const isValidLatitude = latitude => {
    return (
        typeof latitude === 'number' &&
        latitude >= -90 &&
        latitude <= 90
    );
};

export const isValidLongitude = longitude => {
    return (
        typeof longitude === 'number' &&
        longitude >= -180 &&
        longitude <= 180
    );
};

export const isValidCoordinates = (latitude, longitude) => {
    return (
        isValidLatitude(latitude) &&
        isValidLongitude(longitude)
    );
};