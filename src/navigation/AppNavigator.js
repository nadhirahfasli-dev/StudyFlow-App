import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import SplashScreen from '../screens/SplashScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import GardenScreen from '../screens/GardenScreen';
import FocusScreen from '../screens/FocusScreen';
import MusicScreen from '../screens/MusicScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { backgroundColor: '#FAF4E8', borderTopWidth: 0, height: 65, paddingBottom: 10 },
                tabBarActiveTintColor: '#A06847',
                tabBarInactiveTintColor: '#B5A595',
                tabBarIcon: ({ focused }) => {
                    let icon = '🏠';
                    if (route.name === 'HOME') icon = '🏠';
                    else if (route.name === 'TASKS') icon = '📋';
                    else if (route.name === 'FOCUS') icon = '🎯';
                    else if (route.name === 'MUSIC') icon = '🎵';
                    return <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.6 }}>{icon}</Text>;
                },
            })}
        >
            <Tab.Screen name="HOME" component={GardenScreen} />
            <Tab.Screen name="TASKS" component={HomeScreen} />
            <Tab.Screen name="FOCUS" component={FocusScreen} />
            <Tab.Screen name="MUSIC" component={MusicScreen} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={BottomTabs} />
        </Stack.Navigator>
    );
}