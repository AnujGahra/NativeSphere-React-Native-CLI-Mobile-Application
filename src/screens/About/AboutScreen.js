import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { theme } from '../../theme/theme';

const features = [
    {
        icon: '🌐',
        title: 'Network Connectivity',
        description: 'Monitor internet connectivity and network state.',
    },
    {
        icon: '📷',
        title: 'Camera',
        description: 'Capture photos and select images from the device.',
    },
    {
        icon: '🎙️',
        title: 'Audio',
        description: 'Record and play audio using native device capabilities.',
    },
    {
        icon: '📍',
        title: 'Location',
        description: 'Access the device location with runtime permissions.',
    },
    {
        icon: '📱',
        title: 'Device Information',
        description: 'Display hardware, operating system and application details.',
    },
    {
        icon: '🔐',
        title: 'Permissions',
        description: 'View and manage required application permissions.',
    },
];

const techStack = [
    'React Native CLI',
    'JavaScript',
    'React Navigation',
    'Android Native APIs',
    'iOS Native APIs',
];

const AboutScreen = () => {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>N</Text>
                </View>

                <Text style={styles.title}>NativeSphere</Text>

                <Text style={styles.tagline}>
                    Explore the Native Capabilities of Your Device
                </Text>
            </View>

            {/* About */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>About NativeSphere</Text>

                <Text style={styles.description}>
                    NativeSphere is a cross-platform React Native application designed
                    to demonstrate practical implementation of essential mobile device
                    capabilities through a modern and modular interface.
                </Text>

                <Text style={styles.description}>
                    The application provides a single place to explore device features
                    such as connectivity, camera, audio, location, device information,
                    and runtime permission management.
                </Text>
            </View>

            {/* Features */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Native Features</Text>

                {features.map(feature => (
                    <View style={styles.featureRow} key={feature.title}>
                        <View style={styles.featureIcon}>
                            <Text style={styles.iconText}>{feature.icon}</Text>
                        </View>

                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>{feature.title}</Text>

                            <Text style={styles.featureDescription}>
                                {feature.description}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Technology */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Technology Stack</Text>

                {techStack.map((technology, index) => (
                    <View style={styles.techRow} key={technology}>
                        <View style={styles.numberCircle}>
                            <Text style={styles.numberText}>{index + 1}</Text>
                        </View>

                        <Text style={styles.techText}>{technology}</Text>
                    </View>
                ))}
            </View>

            {/* Architecture */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Application Architecture</Text>

                <View style={styles.architectureBox}>
                    <Text style={styles.architectureText}>
                        Screen
                    </Text>

                    <Text style={styles.arrow}>↓</Text>

                    <Text style={styles.architectureText}>
                        Hook
                    </Text>

                    <Text style={styles.arrow}>↓</Text>

                    <Text style={styles.architectureText}>
                        Service Layer
                    </Text>

                    <Text style={styles.arrow}>↓</Text>

                    <Text style={styles.architectureText}>
                        Native API / Device
                    </Text>
                </View>

                <Text style={styles.architectureDescription}>
                    NativeSphere follows a modular architecture where UI screens,
                    reusable hooks, and native service logic are separated for
                    maintainability and scalability.
                </Text>
            </View>

            {/* Platform */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Supported Platforms</Text>

                <View style={styles.platformContainer}>
                    <View style={styles.platformBadge}>
                        <Text style={styles.platformIcon}>🤖</Text>
                        <Text style={styles.platformText}>Android</Text>
                    </View>

                    <View style={styles.platformBadge}>
                        <Text style={styles.platformIcon}></Text>
                        <Text style={styles.platformText}>iOS</Text>
                    </View>
                </View>
            </View>

            {/* Version */}
            <View style={styles.versionContainer}>
                <Text style={styles.versionText}>NativeSphere</Text>
                <Text style={styles.versionSubText}>Version 1.0.0</Text>
                <Text style={styles.footerText}>
                    Built with React Native
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 28,
    },

    logo: {
        width: 82,
        height: 82,
        borderRadius: 26,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },

    logoText: {
        fontSize: 42,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: theme.colors.textPrimary,
        marginBottom: 8,
    },

    tagline: {
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
        color: theme.colors.textSecondary,
        maxWidth: 300,
    },

    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.textPrimary,
        marginBottom: 14,
    },

    description: {
        fontSize: 14,
        lineHeight: 22,
        color: theme.colors.textSecondary,
        marginBottom: 10,
    },

    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },

    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    iconText: {
        fontSize: 22,
    },

    featureContent: {
        flex: 1,
    },

    featureTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.textPrimary,
        marginBottom: 3,
    },

    featureDescription: {
        fontSize: 12,
        lineHeight: 18,
        color: theme.colors.textSecondary,
    },

    techRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    numberCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    numberText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },

    techText: {
        fontSize: 14,
        color: theme.colors.textPrimary,
        fontWeight: '500',
    },

    architectureBox: {
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
    },

    architectureText: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 9,
        color: theme.colors.textPrimary,
        fontSize: 13,
        fontWeight: '600',
    },

    arrow: {
        color: theme.colors.primary,
        fontSize: 18,
        marginVertical: 3,
    },

    architectureDescription: {
        fontSize: 13,
        lineHeight: 20,
        color: theme.colors.textSecondary,
    },

    platformContainer: {
        flexDirection: 'row',
        gap: 12,
    },

    platformBadge: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    platformIcon: {
        fontSize: 22,
        marginBottom: 6,
        color: theme.colors.textPrimary,
    },

    platformText: {
        fontSize: 13,
        fontWeight: '600',
        color: theme.colors.textPrimary,
    },

    versionContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },

    versionText: {
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.textPrimary,
    },

    versionSubText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginTop: 3,
    },

    footerText: {
        fontSize: 11,
        color: theme.colors.textSecondary,
        marginTop: 8,
    },
});

export default AboutScreen;