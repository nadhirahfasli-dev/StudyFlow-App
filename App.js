import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import SplashScreen from './src/screens/SplashScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FocusScreen from './src/screens/FocusScreen';
import MusicScreen from './src/screens/MusicScreen';
import GardenScreen from './src/screens/GardenScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Navigation Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#B88660',
        tabBarInactiveTintColor: '#A09085',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopColor: '#EFE6D8',
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HOME') iconName = 'home-outline';
          else if (route.name === 'FOCUS') iconName = 'timer-outline';
          else if (route.name === 'MUSIC') iconName = 'musical-notes-outline';
          else if (route.name === 'GARDEN') iconName = 'flower-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HOME" component={HomeScreen} />
      <Tab.Screen name="FOCUS" component={FocusScreen} />
      <Tab.Screen name="MUSIC" component={MusicScreen} />
      <Tab.Screen name="GARDEN" component={GardenScreen} />
    </Tab.Navigator>
  );
}

// Main Stack Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}