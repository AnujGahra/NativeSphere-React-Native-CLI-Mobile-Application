import DeviceInfo from 'react-native-device-info';

export const getDeviceInformation = async () => {
    try {
        const [
            batteryLevel,
            deviceId,
            isTablet,
            isEmulator,
        ] = await Promise.all([
            DeviceInfo.getBatteryLevel(),
            DeviceInfo.getUniqueId(),
            DeviceInfo.isTablet(),
            DeviceInfo.isEmulator(),
        ]);

        return {
            brand: DeviceInfo.getBrand(),
            model: DeviceInfo.getModel(),
            deviceType: DeviceInfo.getDeviceType(),
            systemName: DeviceInfo.getSystemName(),
            systemVersion: DeviceInfo.getSystemVersion(),
            appVersion: DeviceInfo.getVersion(),
            buildNumber: DeviceInfo.getBuildNumber(),
            deviceId,
            batteryLevel,
            isTablet,
            isEmulator,
            manufacturer: await DeviceInfo.getManufacturer(),
        };
    } catch (error) {
        throw new Error(
            error?.message ||
            'Unable to retrieve device information.',
        );
    }
};