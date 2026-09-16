import NetInfo from '@react-native-community/netinfo';

export const getNetworkState = async () => {
    try {
        const state = await NetInfo.fetch();

        return {
            isConnected: state.isConnected,
            isInternetReachable: state.isInternetReachable,
            type: state.type,
            details: state.details,
        };
    } catch (error) {
        throw new Error('Unable to retrieve network information.');
    }
};

export const subscribeToNetworkChanges = callback => {
    return NetInfo.addEventListener(state => {
        callback({
            isConnected: state.isConnected,
            isInternetReachable: state.isInternetReachable,
            type: state.type,
            details: state.details,
        });
    });
};