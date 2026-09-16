import {
    check,
    request,
    RESULTS,
    openSettings,
} from 'react-native-permissions';

import {
    CAMERA_PERMISSION,
    MICROPHONE_PERMISSION,
    LOCATION_PERMISSION,
} from '../constants/permissions';

const permissionMap = {
    camera: CAMERA_PERMISSION,
    microphone: MICROPHONE_PERMISSION,
    location: LOCATION_PERMISSION,
};

export const getPermissionStatus = async permission => {
    const permissionType = permissionMap[permission];

    if (!permissionType) {
        throw new Error('Unknown permission type.');
    }

    return check(permissionType);
};

export const requestPermission = async permission => {
    const permissionType = permissionMap[permission];

    if (!permissionType) {
        throw new Error('Unknown permission type.');
    }

    return request(permissionType);
};

export const openAppSettings = async () => {
    await openSettings();
};

export const getPermissionLabel = status => {
    switch (status) {
        case RESULTS.GRANTED:
            return 'Granted';

        case RESULTS.DENIED:
            return 'Not Granted';

        case RESULTS.BLOCKED:
            return 'Blocked';

        case RESULTS.LIMITED:
            return 'Limited';

        case RESULTS.UNAVAILABLE:
            return 'Unavailable';

        case RESULTS.RESTRICTED:
            return 'Restricted';

        default:
            return 'Unknown';
    }
};