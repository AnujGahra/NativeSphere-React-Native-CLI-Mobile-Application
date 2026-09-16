import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { theme } from '../theme/theme';
import StatusBadge from './StatusBadge';

const FeatureCard = ({
    icon,
    title,
    description,
    status,
    onPress,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
            ]}>
            <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{icon}</Text>
                </View>

                {status && <StatusBadge status={status} />}
            </View>

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.description}>
                {description}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.explore}>Explore</Text>
                <Text style={styles.arrow}>→</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        padding: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    pressed: {
        opacity: 0.75,
        transform: [{ scale: 0.98 }],
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        fontSize: 22,
    },

    title: {
        fontSize: 17,
        fontWeight: '700',
        color: theme.colors.textPrimary,
        marginBottom: 6,
    },

    description: {
        fontSize: 13,
        lineHeight: 20,
        color: theme.colors.textSecondary,
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },

    explore: {
        fontSize: 12,
        fontWeight: '700',
        color: theme.colors.primary,
    },

    arrow: {
        fontSize: 17,
        color: theme.colors.primary,
        marginLeft: 7,
    },
});

export default FeatureCard;