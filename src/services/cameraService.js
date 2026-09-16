import {
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker';

export const openCamera = async () => {
    const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.9,
        saveToPhotos: false,
    });

    if (result.didCancel) {
        return {
            cancelled: true,
        };
    }

    if (result.errorCode) {
        throw new Error(
            result.errorMessage || 'Unable to access the camera.',
        );
    }

    const asset = result.assets?.[0];

    if (!asset) {
        throw new Error('No photo was captured.');
    }

    return {
        cancelled: false,
        uri: asset.uri,
        fileName: asset.fileName,
        type: asset.type,
        width: asset.width,
        height: asset.height,
    };
};

export const openGallery = async () => {
    const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.9,
        selectionLimit: 1,
    });

    if (result.didCancel) {
        return {
            cancelled: true,
        };
    }

    if (result.errorCode) {
        throw new Error(
            result.errorMessage || 'Unable to access the gallery.',
        );
    }

    const asset = result.assets?.[0];

    if (!asset) {
        throw new Error('No image was selected.');
    }

    return {
        cancelled: false,
        uri: asset.uri,
        fileName: asset.fileName,
        type: asset.type,
        width: asset.width,
        height: asset.height,
    };
};