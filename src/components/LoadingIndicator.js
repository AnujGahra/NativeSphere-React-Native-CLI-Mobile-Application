import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { theme } from '../theme/theme';

const LoadingIndicator = ({ message = 'Loading...' }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
                color={theme.colors.primary}
            />

            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },

    text: {
        marginTop: 12,
        fontSize: 13,
        color: theme.colors.textSecondary,
    },
});

export default LoadingIndicator;