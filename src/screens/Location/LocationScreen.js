import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    check,
    request,
    RESULTS,
} from 'react-native-permissions';

import AppHeader from '../../components/AppHeader';
import PrimaryButton from '../../components/PrimaryButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorView from '../../components/ErrorView';

import {
    LOCATION_PERMISSION,
} from '../../constants/permissions';

import useLocation from '../../hooks/useLocation';
import theme from '../../theme/theme';

const LocationScreen = () => {
    const {
        location,
        loading,
        error,
        refresh,
    } = useLocation();

    const requestLocationPermission = async () => {
        const currentStatus = await check(
            LOCATION_PERMISSION,
        );

        if (currentStatus === RESULTS.GRANTED) {
            return true;
        }

        const permissionStatus = await request(
            LOCATION_PERMISSION,
        );

        return permissionStatus === RESULTS.GRANTED;
    };

    const handleGetLocation = async () => {
        const granted =
            await requestLocationPermission();

        if (!granted) {
            return;
        }

        await refresh();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>
                <AppHeader
                    title="Location"
                    subtitle="Access your current device location"
                />

                {!location && loading ? (
                    <View style={styles.loadingCard}>
                        <LoadingIndicator />
                        <Text style={styles.loadingText}>
                            Finding your location...
                        </Text>
                    </View>
                ) : null}

                {!location && !loading && error ? (
                    <ErrorView
                        title="Location Unavailable"
                        message={error}
                        onRetry={handleGetLocation}
                    />
                ) : null}

                {location ? (
                    <>
                        <View style={styles.locationCard}>
                            <View style={styles.locationIcon}>
                                <Text style={styles.locationIconText}>
                                    📍
                                </Text>
                            </View>

                            <Text style={styles.locationTitle}>
                                Location Found
                            </Text>

                            <Text style={styles.locationSubtitle}>
                                Your device location was retrieved
                                successfully.
                            </Text>
                        </View>

                        <Text style={styles.sectionTitle}>
                            Coordinates
                        </Text>

                        <View style={styles.detailsCard}>
                            <DetailRow
                                label="Latitude"
                                value={formatCoordinate(
                                    location.latitude,
                                )}
                            />

                            <DetailRow
                                label="Longitude"
                                value={formatCoordinate(
                                    location.longitude,
                                )}
                            />

                            <DetailRow
                                label="Accuracy"
                                value={`${Math.round(
                                    location.accuracy || 0,
                                )} meters`}
                            />
                        </View>
                    </>
                ) : null}

                <PrimaryButton
                    title={
                        loading
                            ? 'Getting Location...'
                            : location
                                ? 'Refresh Location'
                                : 'Get Current Location'
                    }
                    onPress={handleGetLocation}
                    disabled={loading}
                />

                <View style={styles.privacyCard}>
                    <Text style={styles.privacyIcon}>🔒</Text>

                    <View style={styles.privacyContent}>
                        <Text style={styles.privacyTitle}>
                            Privacy
                        </Text>

                        <Text style={styles.privacyText}>
                            NativeSphere uses your location only to
                            demonstrate native location capabilities.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const formatCoordinate = value => {
    if (
        typeof value !== 'number' ||
        Number.isNaN(value)
    ) {
        return 'Unavailable';
    }

    return value.toFixed(6);
};

const DetailRow = ({ label, value }) => {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>

            <Text style={styles.detailValue}>
                {value}
            </Text>
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

    locationCard: {
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.xl,
        padding: 30,
        marginBottom: 28,
    },

    locationIcon: {
        width: 82,
        height: 82,
        borderRadius: 41,
        backgroundColor:
            'rgba(34,211,238,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },

    locationIconText: {
        fontSize: 40,
    },

    locationTitle: {
        color: theme.colors.textPrimary,
        fontSize: 22,
        fontWeight: '800',
    },

    locationSubtitle: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
        marginTop: 8,
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
        minHeight: 60,
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
        fontWeight: '700',
    },

    loadingCard: {
        height: 220,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },

    loadingText: {
        color: theme.colors.textSecondary,
        marginTop: 12,
        fontSize: 14,
    },

    privacyCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        padding: 16,
        marginTop: 20,
    },

    privacyIcon: {
        fontSize: 24,
        marginRight: 12,
    },

    privacyContent: {
        flex: 1,
    },

    privacyTitle: {
        color: theme.colors.textPrimary,
        fontSize: 14,
        fontWeight: '700',
    },

    privacyText: {
        color: theme.colors.textSecondary,
        fontSize: 12,
        lineHeight: 18,
        marginTop: 4,
    },
});

export default LocationScreen;