/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen'; // Ensure the correct path
import SettingsScreen from '../../Screens/SettingsScreen/SettingsScreen'; // Ensure the correct path
import IconButton from '../../Components/IconButton/IconButton';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
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
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <IconButton name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white', // Customize the tab bar background color
          paddingBottom: 5, // Customize the padding
          height: 60, // Customize the height
          marginBottom: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12, // Customize the label font size
        },
        headerShown: false, // Hide the header
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Pro" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
