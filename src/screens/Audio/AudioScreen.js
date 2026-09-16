import React, { useEffect, useState } from 'react';
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
import SecondaryButton from '../../components/SecondaryButton';
import ErrorView from '../../components/ErrorView';

import {
    MICROPHONE_PERMISSION,
} from '../../constants/permissions';

import {
    startRecording,
    stopRecording,
    startPlayback,
    stopPlayback,
    releaseAudio,
} from '../../services/audioService';

import theme from '../../theme/theme';

const AudioScreen = () => {
    const [recording, setRecording] = useState(false);
    const [playing, setPlaying] = useState(false);

    const [recordingUri, setRecordingUri] =
        useState(null);

    const [duration, setDuration] = useState(0);
    const [playbackPosition, setPlaybackPosition] =
        useState(0);

    const [playbackDuration, setPlaybackDuration] =
        useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        return () => {
            releaseAudio();
        };
    }, []);

    const requestMicrophonePermission = async () => {
        const currentStatus = await check(
            MICROPHONE_PERMISSION,
        );

        if (currentStatus === RESULTS.GRANTED) {
            return true;
        }

        const permissionStatus = await request(
            MICROPHONE_PERMISSION,
        );

        return permissionStatus === RESULTS.GRANTED;
    };

    const handleStartRecording = async () => {
        try {
            setLoading(true);
            setError(null);

            const granted =
                await requestMicrophonePermission();

            if (!granted) {
                setError(
                    'Microphone permission was denied. Please allow microphone access from your device settings.',
                );
                return;
            }

            setRecordingUri(null);
            setDuration(0);

            await startRecording(data => {
                setDuration(data.duration);
            });

            setRecording(true);
        } catch (err) {
            setError(
                err.message ||
                'Unable to start audio recording.',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStopRecording = async () => {
        try {
            setLoading(true);
            setError(null);

            const uri = await stopRecording();

            setRecordingUri(uri);
            setRecording(false);
        } catch (err) {
            setError(
                err.message ||
                'Unable to stop audio recording.',
            );
        } finally {
            setLoading(false);
        }
    };

    const handlePlay = async () => {
        if (!recordingUri) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setPlaybackPosition(0);

            await startPlayback(
                recordingUri,
                data => {
                    setPlaybackPosition(
                        Math.floor(data.currentPosition / 1000),
                    );

                    setPlaybackDuration(
                        Math.floor(data.duration / 1000),
                    );

                    if (data.finished) {
                        setPlaying(false);
                        setPlaybackPosition(0);
                    }
                },
            );

            setPlaying(true);
        } catch (err) {
            setError(
                err.message || 'Unable to play audio.',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStopPlayback = async () => {
        try {
            await stopPlayback();

            setPlaying(false);
            setPlaybackPosition(0);
        } catch (err) {
            setError(
                err.message ||
                'Unable to stop audio playback.',
            );
        }
    };

    const formatTime = seconds => {
        const safeSeconds = Math.max(
            0,
            Number(seconds) || 0,
        );

        const minutes = Math.floor(
            safeSeconds / 60,
        );

        const remainingSeconds =
            safeSeconds % 60;

        return `${String(minutes).padStart(
            2,
            '0',
        )}:${String(remainingSeconds).padStart(
            2,
            '0',
        )}`;
    };

    if (error && !recording && !recordingUri) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <AppHeader
                        title="Audio"
                        subtitle="Record and playback audio"
                    />

                    <ErrorView
                        title="Audio Error"
                        message={error}
                        onRetry={handleStartRecording}
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
                    title="Audio"
                    subtitle="Record and playback audio"
                />

                <View style={styles.recorderCard}>
                    <View
                        style={[
                            styles.micCircle,
                            recording && styles.micCircleActive,
                        ]}>
                        <Text style={styles.micIcon}>
                            {recording ? '🔴' : '🎙️'}
                        </Text>
                    </View>

                    <Text style={styles.statusTitle}>
                        {recording
                            ? 'Recording...'
                            : recordingUri
                                ? 'Recording Ready'
                                : 'Ready to Record'}
                    </Text>

                    <Text style={styles.timer}>
                        {formatTime(duration)}
                    </Text>

                    <Text style={styles.description}>
                        {recording
                            ? 'Speak into your microphone.'
                            : recordingUri
                                ? 'Your recording is ready for playback.'
                                : 'Record a short audio clip using your device microphone.'}
                    </Text>

                    {recording ? (
                        <PrimaryButton
                            title="Stop Recording"
                            onPress={handleStopRecording}
                            disabled={loading}
                        />
                    ) : (
                        <PrimaryButton
                            title={
                                loading
                                    ? 'Starting...'
                                    : 'Start Recording'
                            }
                            onPress={handleStartRecording}
                            disabled={loading}
                        />
                    )}
                </View>

                {recordingUri ? (
                    <View style={styles.playbackCard}>
                        <Text style={styles.sectionTitle}>
                            Playback
                        </Text>

                        <View style={styles.playbackInfo}>
                            <Text style={styles.playIcon}>
                                🔊
                            </Text>

                            <View style={styles.playbackText}>
                                <Text style={styles.fileTitle}>
                                    Recorded Audio
                                </Text>

                                <Text style={styles.fileDuration}>
                                    {formatTime(
                                        playing
                                            ? playbackPosition
                                            : duration,
                                    )}
                                    {playbackDuration > 0
                                        ? ` / ${formatTime(
                                            playbackDuration,
                                        )}`
                                        : ''}
                                </Text>
                            </View>
                        </View>

                        {playing ? (
                            <PrimaryButton
                                title="Stop Playback"
                                onPress={handleStopPlayback}
                            />
                        ) : (
                            <PrimaryButton
                                title="Play Recording"
                                onPress={handlePlay}
                                disabled={loading}
                            />
                        )}

                        <View style={styles.resetButton}>
                            <SecondaryButton
                                title="Record Again"
                                onPress={() => {
                                    setRecordingUri(null);
                                    setDuration(0);
                                    setPlaybackPosition(0);
                                }}
                            />
                        </View>
                    </View>
                ) : null}

                {error ? (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
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

    recorderCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 30,
        alignItems: 'center',
    },

    micCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor:
            'rgba(124,92,252,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 22,
    },

    micCircleActive: {
        backgroundColor:
            'rgba(239,68,68,0.15)',
    },

    micIcon: {
        fontSize: 42,
    },

    statusTitle: {
        color: theme.colors.textPrimary,
        fontSize: 22,
        fontWeight: '800',
    },

    timer: {
        color: theme.colors.primaryLight,
        fontSize: 38,
        fontWeight: '800',
        marginTop: 14,
    },

    description: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 24,
    },

    playbackCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 20,
        marginTop: 20,
    },

    sectionTitle: {
        color: theme.colors.textPrimary,
        fontSize: 19,
        fontWeight: '700',
        marginBottom: 18,
    },

    playbackInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    playIcon: {
        fontSize: 32,
        marginRight: 14,
    },

    playbackText: {
        flex: 1,
    },

    fileTitle: {
        color: theme.colors.textPrimary,
        fontSize: 15,
        fontWeight: '700',
    },

    fileDuration: {
        color: theme.colors.textSecondary,
        fontSize: 13,
        marginTop: 5,
    },

    resetButton: {
        marginTop: 12,
    },

    errorText: {
        color: theme.colors.error,
        fontSize: 13,
        textAlign: 'center',
        marginTop: 16,
    },
});

export default AudioScreen;