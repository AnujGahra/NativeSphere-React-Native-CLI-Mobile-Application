import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    RESULTS,
} from 'react-native-permissions';

import AppHeader from '../../components/AppHeader';
import PrimaryButton from '../../components/PrimaryButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorView from '../../components/ErrorView';

import usePermissions from '../../hooks/usePermissions';

import {
    getPermissionLabel,
    openAppSettings,
} from '../../services/permissionService';

import theme from '../../theme/theme';

const permissionItems = [
    {
        key: 'camera',
        icon: '📷',
        title: 'Camera',
        description:
            'Required to capture photos using your device camera.',
    },

    {
        key: 'microphone',
        icon: '🎙️',
        title: 'Microphone',
        description:
            'Required to record audio using your device microphone.',
    },

    {
        key: 'location',
        icon: '📍',
        title: 'Location',
        description:
            'Required to retrieve your current device location.',
    },
];

const PermissionsScreen = () => {
    const {
        statuses,
        loading,
        error,
        refresh,
        request,
    } = usePermissions();

    const handlePermissionAction = async key => {
        const status = statuses[key];

        if (status === RESULTS.BLOCKED) {
            await openAppSettings();
            return;
        }

        await request(key);
    };

    if (loading && Object.keys(statuses).length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <LoadingIndicator />
            </SafeAreaView>
        );
    }

    if (error && Object.keys(statuses).length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <AppHeader
                        title="Permissions"
                        subtitle="Manage NativeSphere permissions"
                    />

                    <ErrorView
                        title="Permission Check Failed"
                        message={error}
                        onRetry={refresh}
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
                    title="Permissions"
                    subtitle="Manage NativeSphere permissions"
                />

                <View style={styles.introCard}>
                    <View style={styles.introIcon}>
                        <Text style={styles.introIconText}>
                            🔐
                        </Text>
                    </View>

                    <View style={styles.introContent}>
                        <Text style={styles.introTitle}>
                            Permission Center
                        </Text>

                        <Text style={styles.introDescription}>
                            Review and manage the permissions required
                            by NativeSphere's native features.
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>
                    Application Permissions
                </Text>

                {permissionItems.map(item => {
                    const status = statuses[item.key];
                    const label = getPermissionLabel(status);

                    const granted =
                        status === RESULTS.GRANTED;

                    const blocked =
                        status === RESULTS.BLOCKED;

                    return (
                        <View
                            key={item.key}
                            style={styles.permissionCard}>
                            <View style={styles.iconContainer}>
                                <Text style={styles.icon}>
                                    {item.icon}
                                </Text>
                            </View>

                            <View style={styles.permissionContent}>
                                <View style={styles.titleRow}>
                                    <Text style={styles.permissionTitle}>
                                        {item.title}
                                    </Text>

                                    <View
                                        style={[
                                            styles.statusBadge,
                                            granted
                                                ? styles.grantedBadge
                                                : blocked
                                                    ? styles.blockedBadge
                                                    : styles.pendingBadge,
                                        ]}>
                                        <View
                                            style={[
                                                styles.statusDot,
                                                granted
                                                    ? styles.grantedDot
                                                    : blocked
                                                        ? styles.blockedDot
                                                        : styles.pendingDot,
                                            ]}
                                        />

                                        <Text
                                            style={[
                                                styles.statusText,
                                                granted
                                                    ? styles.grantedText
                                                    : blocked
                                                        ? styles.blockedText
                                                        : styles.pendingText,
                                            ]}>
                                            {label}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={styles.description}>
                                    {item.description}
                                </Text>

                                {!granted ? (
                                    <PrimaryButton
                                        title={
                                            blocked
                                                ? 'Open Settings'
                                                : 'Grant Permission'
                                        }
                                        onPress={() =>
                                            handlePermissionAction(
                                                item.key,
                                            )
                                        }
                                    />
                                ) : (
                                    <Text style={styles.grantedMessage}>
                                        ✓ Permission is available
                                    </Text>
                                )}
                            </View>
                        </View>
                    );
                })}

                <PrimaryButton
                    title={
                        loading
                            ? 'Refreshing...'
                            : 'Refresh Permissions'
                    }
                    onPress={refresh}
                    disabled={loading}
                />

                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>ℹ️</Text>

                    <Text style={styles.infoText}>
                        Some permissions can only be changed from
                        your device settings after they have been
                        permanently denied.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
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

    introCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.xl,
        padding: 20,
        marginBottom: 28,
    },

    introIcon: {
        width: 58,
        height: 58,
        borderRadius: 18,
        backgroundColor:
            'rgba(124,92,252,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    introIconText: {
        fontSize: 28,
    },

    introContent: {
        flex: 1,
    },

    introTitle: {
        color: theme.colors.textPrimary,
        fontSize: 18,
        fontWeight: '700',
    },

    introDescription: {
        color: theme.colors.textSecondary,
        fontSize: 13,
        lineHeight: 19,
        marginTop: 5,
    },

    sectionTitle: {
        color: theme.colors.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 14,
    },

    permissionCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        padding: 16,
        marginBottom: 14,
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor:
            'rgba(124,92,252,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    icon: {
        fontSize: 23,
    },

    permissionContent: {
        flex: 1,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },

    permissionTitle: {
        color: theme.colors.textPrimary,
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
    },

    description: {
        color: theme.colors.textSecondary,
        fontSize: 12,
        lineHeight: 18,
        marginTop: 8,
        marginBottom: 14,
    },

    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 20,
    },

    grantedBadge: {
        backgroundColor:
            'rgba(34,197,94,0.12)',
    },

    blockedBadge: {
        backgroundColor:
            'rgba(239,68,68,0.12)',
    },

    pendingBadge: {
        backgroundColor:
            'rgba(245,158,11,0.12)',
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 5,
    },

    grantedDot: {
        backgroundColor: theme.colors.success,
    },

    blockedDot: {
        backgroundColor: theme.colors.error,
    },

    pendingDot: {
        backgroundColor: theme.colors.warning,
    },

    statusText: {
        fontSize: 10,
        fontWeight: '700',
    },

    grantedText: {
        color: theme.colors.success,
    },

    blockedText: {
        color: theme.colors.error,
    },

    pendingText: {
        color: theme.colors.warning,
    },

    grantedMessage: {
        color: theme.colors.success,
        fontSize: 12,
        fontWeight: '600',
    },

    infoCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        padding: 16,
        marginTop: 20,
    },

    infoIcon: {
        fontSize: 20,
        marginRight: 10,
    },

    infoText: {
        flex: 1,
        color: theme.colors.textSecondary,
        fontSize: 12,
        lineHeight: 18,
    },
});

export default PermissionsScreen;