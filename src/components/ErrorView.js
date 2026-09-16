import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { theme } from '../theme/theme';
import PrimaryButton from './PrimaryButton';

const ErrorView = ({
    title = 'Something went wrong',
    message = 'Please try again.',
    onRetry,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>⚠️</Text>

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.message}>{message}</Text>

            {onRetry && (
                <PrimaryButton
                    title="Try Again"
                    onPress={onRetry}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },

    icon: {
        fontSize: 32,
        marginBottom: 12,
    },

    title: {
        fontSize: 17,
        fontWeight: '700',
        color: theme.colors.textPrimary,
        marginBottom: 7,
    },

    message: {
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'center',
        color: theme.colors.textSecondary,
        marginBottom: 18,
    },
});

export default ErrorView;