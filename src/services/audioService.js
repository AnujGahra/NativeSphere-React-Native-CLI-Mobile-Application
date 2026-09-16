import Sound from 'react-native-nitro-sound';

let recordingListener = null;

export const startRecording = async onProgress => {
    try {
        if (recordingListener) {
            recordingListener.remove();
            recordingListener = null;
        }

        const uri = await Sound.startRecorder();

        if (onProgress) {
            recordingListener = Sound.addRecordBackListener(e => {
                const duration = Math.floor(
                    e.currentPosition / 1000,
                );

                onProgress({
                    duration,
                    currentPosition: e.currentPosition,
                });
            });
        }

        return uri;
    } catch (error) {
        throw new Error(
            error?.message || 'Unable to start audio recording.',
        );
    }
};

export const stopRecording = async () => {
    try {
        if (recordingListener) {
            recordingListener.remove();
            recordingListener = null;
        }

        const uri = await Sound.stopRecorder();

        return uri;
    } catch (error) {
        throw new Error(
            error?.message || 'Unable to stop audio recording.',
        );
    }
};

export const startPlayback = async (
    uri,
    onProgress,
) => {
    try {
        await Sound.startPlayer(uri);

        if (onProgress) {
            Sound.addPlayBackListener(e => {
                const currentPosition = e.currentPosition || 0;
                const duration = e.duration || 0;

                onProgress({
                    currentPosition,
                    duration,
                    finished: duration > 0 &&
                        currentPosition >= duration,
                });
            });
        }
    } catch (error) {
        throw new Error(
            error?.message || 'Unable to play audio.',
        );
    }
};

export const stopPlayback = async () => {
    try {
        await Sound.stopPlayer();
        Sound.removePlayBackListener();
    } catch (error) {
        throw new Error(
            error?.message || 'Unable to stop audio playback.',
        );
    }
};

export const releaseAudio = async () => {
    try {
        Sound.removeRecordBackListener();
        Sound.removePlayBackListener();

        await Sound.stopPlayer();
    } catch (error) {
        // Audio may already be stopped.
    }

    recordingListener = null;
};