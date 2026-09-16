import React, { useCallback, useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import AppHeader from '../../components/AppHeader';
import PrimaryButton from '../../components/PrimaryButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorView from '../../components/ErrorView';

import {
    getDeviceInformation,
} from '../../services/deviceService';

import theme from '../../theme/theme';

const DeviceInfoScreen = () => {
    const [device, setDevice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDeviceInformation = useCallback(
        async () => {
            try {
                setLoading(true);
                setError(null);

                const information =
                    await getDeviceInformation();

                setDevice(information);
            } catch (err) {
                setError(
                    err.message ||
                    'Unable to retrieve device information.',
                );
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    useEffect(() => {
        fetchDeviceInformation();
    }, [fetchDeviceInformation]);

    if (loading && !device) {
        return (
            <SafeAreaView style={styles.container}>
                <LoadingIndicator />
            </SafeAreaView>
        );
    }

    if (error && !device) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <AppHeader
                        title="Device Information"
                        subtitle="Explore your device details"
                    />

                    <ErrorView
                        title="Device Information Unavailable"
                        message={error}
                        onRetry={fetchDeviceInformation}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>
                <AppHeader
                    title="Device Information"
                    subtitle="Explore your device details"
                />

                <View style={styles.deviceCard}>
                    <View style={styles.deviceIcon}>
                        <Text style={styles.deviceIconText}>
                            📱
                        </Text>
                    </View>

                    <Text style={styles.deviceModel}>
                        {device?.model || 'Unknown Device'}
                    </Text>

                    <Text style={styles.deviceBrand}>
                        {device?.brand || 'Unknown Brand'}
                    </Text>

                    <View style={styles.platformBadge}>
                        <Text style={styles.platformText}>
                            {device?.systemName || 'Unknown'}{' '}
                            {device?.systemVersion || ''}
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>
                    Device Details
                </Text>

                <View style={styles.detailsCard}>
                    <DetailRow
                        label="Manufacturer"
                        value={device?.manufacturer}
                    />

                    <DetailRow
                        label="Brand"
                        value={device?.brand}
                    />

                    <DetailRow
                        label="Model"
                        value={device?.model}
                    />

                    <DetailRow
                        label="Device Type"
                        value={device?.deviceType}
                    />

                    <DetailRow
                        label="Tablet"
                        value={device?.isTablet ? 'Yes' : 'No'}
                    />

                    <DetailRow
                        label="Emulator"
                        value={
                            device?.isEmulator ? 'Yes' : 'No'
                        }
                    />
                </View>

                <Text style={styles.sectionTitle}>
                    Software
                </Text>

                <View style={styles.detailsCard}>
                    <DetailRow
                        label="Operating System"
                        value={device?.systemName}
                    />

                    <DetailRow
                        label="OS Version"
                        value={device?.systemVersion}
                    />

                    <DetailRow
                        label="App Version"
                        value={device?.appVersion}
                    />

                    <DetailRow
                        label="Build Number"
                        value={device?.buildNumber}
                    />
                </View>

                <Text style={styles.sectionTitle}>
                    Device Status
                </Text>

                <View style={styles.detailsCard}>
                    <DetailRow
                        label="Battery"
                        value={formatBattery(
                            device?.batteryLevel,
                        )}
                    />

                    <DetailRow
                        label="Device Identifier"
                        value={formatDeviceId(
                            device?.deviceId,
                        )}
                    />
                </View>

                <PrimaryButton
                    title={
                        loading
                            ? 'Refreshing...'
                            : 'Refresh Information'
                    }
                    onPress={fetchDeviceInformation}
                    disabled={loading}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const DetailRow = ({ label, value }) => {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
                {label}
            </Text>

            <Text style={styles.detailValue}>
                {value || 'Unavailable'}
            </Text>
        </View>
    );
};

const formatBattery = level => {
    if (
        typeof level !== 'number' ||
        level < 0
    ) {
        return 'Unavailable';
    }

    return `${Math.round(level * 100)}%`;
};

const formatDeviceId = id => {
    if (!id) {
        return 'Unavailable';
    }

    if (id.length <= 16) {
        return id;
    }

    return `${id.substring(0, 8)}...${id.substring(
        id.length - 8,
    )}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    content: {
        padding: 20,
        paddingBottom: 100,
    },

    deviceCard: {
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.xl,
        padding: 28,
        marginBottom: 28,
    },

    deviceIcon: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor:
            'rgba(124,92,252,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },

    deviceIconText: {
        fontSize: 42,
    },

    deviceModel: {
        color: theme.colors.textPrimary,
        fontSize: 23,
        fontWeight: '800',
        textAlign: 'center',
    },

    deviceBrand: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        marginTop: 5,
    },

    platformBadge: {
        backgroundColor:
            'rgba(34,211,238,0.12)',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 7,
        marginTop: 14,
    },

    platformText: {
        color: theme.colors.secondary,
        fontSize: 12,
        fontWeight: '700',
    },

    sectionTitle: {
        color: theme.colors.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 14,
    },

    detailsCard: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        paddingHorizontal: 18,
        marginBottom: 24,
    },

    detailRow: {
        minHeight: 58,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },

    detailLabel: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        flex: 1,
    },

    detailValue: {
        color: theme.colors.textPrimary,
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'right',
        maxWidth: '58%',
    },
});

export default DeviceInfoScreen;