import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { theme } from '../../theme/theme';

const LoadingScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Main');
        }, 1600);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.loaderContainer}>
                <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                />

                <Text style={styles.title}>Preparing NativeSphere</Text>

                <Text style={styles.subtitle}>
                    Initializing device capabilities...
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },

    loaderContainer: {
        alignItems: 'center',
    },

    title: {
        marginTop: 22,
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },

    subtitle: {
        marginTop: 8,
        fontSize: 13,
        color: theme.colors.textSecondary,
    },
});

export default LoadingScreen;