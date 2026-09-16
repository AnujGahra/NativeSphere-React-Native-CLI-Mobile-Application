import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { theme } from '../../theme/theme';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Loading');
        }, 1800);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>N</Text>
            </View>

            <Text style={styles.title}>NativeSphere</Text>

            <Text style={styles.tagline}>
                Explore the Native Capabilities{'\n'}of Your Device
            </Text>

            <View style={styles.bottomContainer}>
                <Text style={styles.poweredBy}>Powered by React Native</Text>
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

    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 32,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },

    logo: {
        fontSize: 52,
        fontWeight: '900',
        color: '#FFFFFF',
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        color: theme.colors.textPrimary,
        marginBottom: 10,
    },

    tagline: {
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
        color: theme.colors.textSecondary,
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 35,
    },

    poweredBy: {
        fontSize: 11,
        color: theme.colors.textSecondary,
    },
});

export default SplashScreen;