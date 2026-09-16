import { useCallback, useEffect, useState } from 'react';
import {
    check,
    openSettings,
    request,
    RESULTS,
    PERMISSIONS,
} from 'react-native-permissions';

const permissionMap = {
    camera: {
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
    },

    microphone: {
        android: PERMISSIONS.ANDROID.RECORD_AUDIO,
        ios: PERMISSIONS.IOS.MICROPHONE,
    },

    location: {
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    },
};

const usePermissions = () => {
    const [permissions, setPermissions] = useState({});

    const checkPermission = useCallback(async type => {
        try {
            const permission =
                permissionMap[type]?.[Platform.OS];

            if (!permission) {
                return RESULTS.UNAVAILABLE;
            }

            return await check(permission);
        } catch (error) {
            console.error('Permission check error:', error);
            return RESULTS.UNAVAILABLE;
        }
    }, []);

    const refreshPermissions = useCallback(async () => {
        const result = {};

        for (const type of Object.keys(permissionMap)) {
            result[type] = await checkPermission(type);
        }

        setPermissions(result);
    }, [checkPermission]);

    const requestPermission = useCallback(async type => {
        try {
            const permission =
                permissionMap[type]?.[Platform.OS];

            if (!permission) {
                return RESULTS.UNAVAILABLE;
            }

            const result = await request(permission);

            await refreshPermissions();

            return result;
        } catch (error) {
            console.error('Permission request error:', error);
            return RESULTS.UNAVAILABLE;
        }
    }, [refreshPermissions]);

    const openAppSettings = useCallback(async () => {
        await openSettings();
    }, []);

    useEffect(() => {
        refreshPermissions();
    }, [refreshPermissions]);

    return {
        permissions,
        requestPermission,
        refreshPermissions,
        openAppSettings,
    };
};

export default usePermissions;