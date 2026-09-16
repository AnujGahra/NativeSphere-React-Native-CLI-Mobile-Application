import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
} from 'react-native';

import { theme } from '../theme/theme';

const SecondaryButton = ({
    title,
    onPress,
    disabled = false,
}) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                disabled && styles.disabled,
            ]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        minHeight: 48,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    pressed: {
        opacity: 0.7,
    },

    disabled: {
        opacity: 0.5,
    },

    text: {
        color: theme.colors.textPrimary,
        fontSize: 14,
        fontWeight: '700',
    },
});

export default SecondaryButton;