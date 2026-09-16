import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
} from 'react-native';

import { theme } from '../theme/theme';

const PrimaryButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
}) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                (disabled || loading) && styles.disabled,
            ]}>
            {loading ? (
                <ActivityIndicator color="#FFFFFF" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        minHeight: 48,
        borderRadius: 14,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    pressed: {
        opacity: 0.8,
    },

    disabled: {
        opacity: 0.5,
    },

    text: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
});

export default PrimaryButton;