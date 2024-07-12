/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen'; // Ensure the correct path
import SettingsScreen from '../../Screens/SettingsScreen/SettingsScreen'; // Ensure the correct path
import IconButton from '../../Components/IconButton/IconButton';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{flex: 1, backgroundColor: 'white'}}
        edges={['bottom']}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused
                  ? 'map-marker-account'
                  : 'map-marker-account-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'account' : 'account-outline';
              }

              // You can return any component that you like here!
              return <IconButton name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: 'white', // Customize the tab bar background color
              paddingBottom: 10, // Customize the padding
              height: 60, // Customize the height
            },
            tabBarLabelStyle: {
              fontSize: 12, // Customize the label font size
            },
            headerShown: false, // Hide the header
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="Profile" component={SettingsScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BottomTabs;
