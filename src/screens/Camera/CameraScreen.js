import React, { useState } from 'react';
import {
    Image,
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
import SecondaryButton from '../../components/SecondaryButton';
import ErrorView from '../../components/ErrorView';
import {
    CAMERA_PERMISSION,
} from '../../constants/permissions';
import {
    openCamera,
    openGallery,
} from '../../services/cameraService';
import theme from '../../theme/theme';

const CameraScreen = () => {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestCameraPermission = async () => {
        const currentStatus = await check(CAMERA_PERMISSION);

        if (currentStatus === RESULTS.GRANTED) {
            return true;
        }

        const permissionStatus = await request(
            CAMERA_PERMISSION,
        );

        return permissionStatus === RESULTS.GRANTED;
    };

    const handleOpenCamera = async () => {
        try {
            setLoading(true);
            setError(null);

            const granted = await requestCameraPermission();

            if (!granted) {
                setError(
                    'Camera permission was denied. Please allow camera access from your device settings.',
                );
                return;
            }

            const result = await openCamera();

            if (!result.cancelled) {
                setPhoto(result);
            }
        } catch (err) {
            setError(
                err.message || 'Unable to open the camera.',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleOpenGallery = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await openGallery();

            if (!result.cancelled) {
                setPhoto(result);
            }
        } catch (err) {
            setError(
                err.message || 'Unable to open the gallery.',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRetake = () => {
        setPhoto(null);
        setError(null);
    };

    if (error && !photo) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <AppHeader
                        title="Camera"
                        subtitle="Capture and preview photos"
                    />

                    <ErrorView
                        title="Camera Error"
                        message={error}
                        onRetry={handleOpenCamera}
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
                    title="Camera"
                    subtitle="Capture and preview photos"
                />

                {photo ? (
                    <>
                        <View style={styles.previewContainer}>
                            <Image
                                source={{ uri: photo.uri }}
                                style={styles.preview}
                                resizeMode="cover"
                            />
                        </View>

                        <Text style={styles.successTitle}>
                            Photo Captured
                        </Text>

                        <Text style={styles.photoDetails}>
                            {photo.width || '—'} × {photo.height || '—'}
                        </Text>

                        <View style={styles.buttonSpacing}>
                            <PrimaryButton
                                title="Take Another Photo"
                                onPress={handleRetake}
                            />
                        </View>
                    </>
                ) : (
                    <View style={styles.emptyCard}>
                        <View style={styles.cameraIcon}>
                            <Text style={styles.cameraIconText}>📷</Text>
                        </View>

                        <Text style={styles.emptyTitle}>
                            Camera Ready
                        </Text>

                        <Text style={styles.emptyDescription}>
                            Use your device camera to capture a photo
                            and preview it inside NativeSphere.
                        </Text>

                        <PrimaryButton
                            title={
                                loading
                                    ? 'Opening Camera...'
                                    : 'Open Camera'
                            }
                            onPress={handleOpenCamera}
                            disabled={loading}
                        />

                        <View style={styles.buttonSpacing}>
                            <SecondaryButton
                                title="Choose from Gallery"
                                onPress={handleOpenGallery}
                            />
                        </View>
                    </View>
                )}

                {error && photo ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}
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

    emptyCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 28,
        alignItems: 'center',
    },

    cameraIcon: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(124,92,252,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 22,
    },

    cameraIconText: {
        fontSize: 42,
    },

    emptyTitle: {
        color: theme.colors.textPrimary,
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 8,
    },

    emptyDescription: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
        marginBottom: 24,
    },

    buttonSpacing: {
        width: '100%',
        marginTop: 12,
    },

    previewContainer: {
        width: '100%',
        height: 420,
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    preview: {
        width: '100%',
        height: '100%',
    },

    successTitle: {
        color: theme.colors.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 18,
    },

    photoDetails: {
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: 6,
    },

    errorText: {
        color: theme.colors.error,
        fontSize: 13,
        textAlign: 'center',
        marginTop: 16,
    },
});

export default CameraScreen;