import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import LoadingScreen from '../screens/Loading/LoadingScreen';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                }}>

                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                />

                <Stack.Screen
                    name="Loading"
                    component={LoadingScreen}
                />

                <Stack.Screen
                    name="Main"
                    component={MainNavigator}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;