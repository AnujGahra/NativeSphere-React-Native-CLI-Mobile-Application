import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { theme } from '../theme/theme';

const StatusBadge = ({ status = 'Unknown' }) => {
    const normalizedStatus = status.toLowerCase();

    const isSuccess =
        normalizedStatus === 'connected' ||
        normalizedStatus === 'granted' ||
        normalizedStatus === 'available' ||
        normalizedStatus === 'active';

    const isWarning =
        normalizedStatus === 'denied' ||
        normalizedStatus === 'blocked' ||
        normalizedStatus === 'unavailable';

    return (
        <View
            style={[
                styles.badge,
                isSuccess && styles.success,
                isWarning && styles.warning,
            ]}>
            <View
                style={[
                    styles.dot,
                    isSuccess && styles.successDot,
                    isWarning && styles.warningDot,
                ]}
            />

            <Text style={styles.text}>{status}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
    },

    success: {
        backgroundColor: 'rgba(34, 197, 94, 0.12)',
    },

    warning: {
        backgroundColor: 'rgba(245, 158, 11, 0.12)',
    },

    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: theme.colors.textSecondary,
        marginRight: 6,
    },

    successDot: {
        backgroundColor: '#22C55E',
    },

    warningDot: {
        backgroundColor: '#F59E0B',
    },

    text: {
        fontSize: 11,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },
});

export default StatusBadge;