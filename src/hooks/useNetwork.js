import { useCallback, useEffect, useState } from 'react';
import {
    getNetworkState,
    subscribeToNetworkChanges,
} from '../services/networkService';

const useNetwork = () => {
    const [network, setNetwork] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNetwork = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const state = await getNetworkState();

            setNetwork(state);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNetwork();

        const unsubscribe = subscribeToNetworkChanges(state => {
            setNetwork(state);
            setError(null);
            setLoading(false);
        });

        return unsubscribe;
    }, [fetchNetwork]);

    return {
        network,
        loading,
        error,
        refresh: fetchNetwork,
    };
};

export default useNetwork;