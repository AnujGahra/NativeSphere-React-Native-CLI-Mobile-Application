import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home/HomeScreen';
import NetworkScreen from '../screens/Network/NetworkScreen';
import CameraScreen from '../screens/Camera/CameraScreen';
import AudioScreen from '../screens/Audio/AudioScreen';
import LocationScreen from '../screens/Location/LocationScreen';
import DeviceInfoScreen from '../screens/Device/DeviceInfoScreen';
import PermissionsScreen from '../screens/Permissions/PermissionsScreen';
import AboutScreen from '../screens/About/AboutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: '#070B14',
                },
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
            screenOptions={{
                headerShown: false,

                tabBarStyle: {
                    backgroundColor: '#0D1322',
                    borderTopColor: '#263044',
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 8,
                },

                tabBarActiveTintColor: '#7C5CFC',
                tabBarInactiveTintColor: '#697386',
            }}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => '⌂',
                }}
            />

            <Tab.Screen
                name="Permissions"
                component={PermissionsScreen}
                options={{
                    tabBarLabel: 'Permissions',
                    tabBarIcon: () => '🔐',
                }}
            />

            <Tab.Screen
                name="About"
                component={AboutScreen}
                options={{
                    tabBarLabel: 'About',
                    tabBarIcon: () => 'ⓘ',
                }}
            />
        </Tab.Navigator>
    );
};

export default MainNavigator;