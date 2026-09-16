import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { theme } from '../theme/theme';

const EmptyState = ({
    icon = '📭',
    title = 'Nothing here',
    message = 'There is no information to display.',
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>{icon}</Text>

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.message}>{message}</Text>
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
        fontSize: 34,
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
    },
});

export default EmptyState;