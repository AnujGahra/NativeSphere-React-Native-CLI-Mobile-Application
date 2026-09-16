import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { theme } from '../theme/theme';

const AppHeader = ({
    title,
    subtitle,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: '800',
        color: theme.colors.textPrimary,
    },

    subtitle: {
        marginTop: 5,
        fontSize: 13,
        lineHeight: 19,
        color: theme.colors.textSecondary,
    },
});

export default AppHeader;