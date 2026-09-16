import React from 'react';
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
import StatusBadge from '../../components/StatusBadge';
import useNetwork from '../../hooks/useNetwork';
import theme from '../../theme/theme';

const NetworkScreen = ({ navigation }) => {
    const {
        network,
        loading,
        error,
        refresh,
    } = useNetwork();

    const getConnectionStatus = () => {
        if (!network) {
            return 'Unknown';
        }

        if (
            network.isConnected &&
            network.isInternetReachable !== false
        ) {
            return 'Connected';
        }

        return 'Disconnected';
    };

    const getNetworkType = () => {
        if (!network) {
            return 'Unknown';
        }

        return network.type || 'Unknown';
    };

    if (loading && !network) {
        return (
            <SafeAreaView style={styles.container}>
                <LoadingIndicator />
            </SafeAreaView>
        );
    }

    if (error && !network) {
        return (
            <SafeAreaView style={styles.container}>
                <ErrorView
                    title="Network Information Unavailable"
                    message={error}
                    onRetry={refresh}
                />
            </SafeAreaView>
        );
    }

    const connectionStatus = getConnectionStatus();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>
                <AppHeader
                    title="Network"
                    subtitle="Monitor your device connectivity"
                />

                <View style={styles.statusCard}>
                    <View style={styles.statusIcon}>
                        <Text style={styles.statusIconText}>
                            {connectionStatus === 'Connected'
                                ? '✓'
                                : '×'}
                        </Text>
                    </View>

                    <Text style={styles.statusTitle}>
                        {connectionStatus}
                    </Text>

                    <Text style={styles.statusDescription}>
                        {connectionStatus === 'Connected'
                            ? 'Your device is connected to a network.'
                            : 'Your device is currently offline.'}
                    </Text>

                    <StatusBadge status={connectionStatus} />
                </View>

                <Text style={styles.sectionTitle}>
                    Connection Details
                </Text>

                <View style={styles.detailsCard}>
                    <DetailRow
                        label="Network Type"
                        value={getNetworkType()}
                    />

                    <DetailRow
                        label="Internet"
                        value={
                            network?.isInternetReachable === false
                                ? 'Not Reachable'
                                : 'Reachable'
                        }
                    />

                    <DetailRow
                        label="Connection"
                        value={
                            network?.isConnected
                                ? 'Available'
                                : 'Unavailable'
                        }
                    />
                </View>

                <PrimaryButton
                    title={loading ? 'Checking...' : 'Refresh Network'}
                    onPress={refresh}
                    disabled={loading}
                />

                <Text style={styles.info}>
                    Network information updates automatically when
                    your connection changes.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const DetailRow = ({ label, value }) => {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>

            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
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

    statusCard: {
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 30,
        marginBottom: 28,
    },

    statusIcon: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(124,92,252,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },

    statusIconText: {
        color: theme.colors.primaryLight,
        fontSize: 36,
        fontWeight: '700',
    },

    statusTitle: {
        color: theme.colors.textPrimary,
        fontSize: 24,
        fontWeight: '800',
    },

    statusDescription: {
        color: theme.colors.textSecondary,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 8,
        marginBottom: 16,
    },

    sectionTitle: {
        color: theme.colors.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 14,
    },

    detailsCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
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
    },

    detailValue: {
        color: theme.colors.textPrimary,
        fontSize: 14,
        fontWeight: '600',
    },

    info: {
        color: theme.colors.textMuted,
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
        marginTop: 16,
    },
});

export default NetworkScreen;