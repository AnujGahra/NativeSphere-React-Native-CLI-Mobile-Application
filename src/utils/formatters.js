export const formatBytes = bytes => {
    if (!bytes || bytes <= 0) {
        return '0 B';
    }

    const units = ['B', 'KB', 'MB', 'GB'];
    const index = Math.floor(
        Math.log(bytes) / Math.log(1024),
    );

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]
        }`;
};

export const formatDate = date => {
    if (!date) {
        return 'N/A';
    }

    return new Date(date).toLocaleString();
};

export const formatCoordinate = value => {
    if (typeof value !== 'number') {
        return 'N/A';
    }

    return value.toFixed(6);
};