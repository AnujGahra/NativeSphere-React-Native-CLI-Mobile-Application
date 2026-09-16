import { useCallback, useState } from 'react';

import {
    getCurrentLocation,
} from '../services/locationService';

const useLocation = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLocation = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await getCurrentLocation();

            setLocation(result);
        } catch (err) {
            setError(
                err.message ||
                'Unable to retrieve your location.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        location,
        loading,
        error,
        refresh: fetchLocation,
    };
};

export default useLocation;