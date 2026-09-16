export const getErrorMessage = error => {
    if (!error) {
        return 'An unknown error occurred.';
    }

    if (typeof error === 'string') {
        return error;
    }

    if (error.message) {
        return error.message;
    }

    return 'Something went wrong. Please try again.';
};

export const logError = (context, error) => {
    console.error(`[NativeSphere] ${context}:`, error);
};