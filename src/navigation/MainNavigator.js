import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/HomeScreen';
import NetworkScreen from '../screens/Network/NetworkScreen';
import CameraScreen from '../screens/Camera/CameraScreen';
import AudioScreen from '../screens/Audio/AudioScreen';
import LocationScreen from '../screens/Location/LocationScreen';
import DeviceInfoScreen from '../screens/Device/DeviceInfoScreen';
import PermissionsScreen from '../screens/Permissions/PermissionsScreen';
import AboutScreen from '../screens/About/AboutScreen';

import { theme } from '../theme/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="HomeDashboard"
                component={HomeScreen}
            />

            <Stack.Screen
                name="Network"
                component={NetworkScreen}
            />

            <Stack.Screen
                name="Camera"
                component={CameraScreen}
            />

            <Stack.Screen
                name="Audio"
                component={AudioScreen}
            />

            <Stack.Screen
                name="Location"
                component={LocationScreen}
            />

            <Stack.Screen
                name="Device"
                component={DeviceInfoScreen}
            />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textMuted,

                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.border,
                    height: 64,
                    paddingBottom: 8,
                    paddingTop: 8,
                },

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },

                tabBarIcon: ({ focused }) => {
                    let icon = '⌂';

                    if (route.name === 'Permissions') {
                        icon = '🔐';
                    }

                    if (route.name === 'About') {
                        icon = 'ⓘ';
                    }

                    return (
                        <Text
                            style={{
                                fontSize: 19,
                                opacity: focused ? 1 : 0.6,
                            }}>
                            {icon}
                        </Text>
                    );
                },
            })}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
            />

            <Tab.Screen
                name="Permissions"
                component={PermissionsScreen}
            />

            <Tab.Screen
                name="About"
                component={AboutScreen}
            />
        </Tab.Navigator>
    );
};

export default MainNavigator;