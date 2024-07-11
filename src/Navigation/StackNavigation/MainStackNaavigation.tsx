import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/LoginScreen/LoginScreen';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';

export type MainStackParamList = {
  Home: {url: string; userToken: string};
  Login: undefined;
};

function MainStackNaavigation() {
  const MainStack = createNativeStackNavigator<MainStackParamList>();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
}

export default MainStackNaavigation;
