import { useCallback, useEffect, useState } from 'react';

import {
    getPermissionStatus,
    requestPermission,
} from '../services/permissionService';

const permissions = [
    'camera',
    'microphone',
    'location',
];

const usePermissions = () => {
    const [statuses, setStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPermissions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const results = {};

            for (const permission of permissions) {
                results[permission] =
                    await getPermissionStatus(permission);
            }

            setStatuses(results);
        } catch (err) {
            setError(
                err.message ||
                'Unable to check permissions.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const request = useCallback(
        async permission => {
            try {
                setError(null);

                const result =
                    await requestPermission(permission);

                setStatuses(previous => ({
                    ...previous,
                    [permission]: result,
                }));

                return result;
            } catch (err) {
                setError(
                    err.message ||
                    'Unable to request permission.',
                );

                return null;
            }
        },
        [],
    );

    useEffect(() => {
        loadPermissions();
    }, [loadPermissions]);

    return {
        statuses,
        loading,
        error,
        refresh: loadPermissions,
        request,
    };
};

export default usePermissions;