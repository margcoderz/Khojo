import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/LoginScreen/LoginScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/Store';
import {getLogin} from '../../Modules/AuthModule/LoginForm/LoginSlice';
import BottomTabs from '../BottomTabNavigation/BottomTabs';

export type MainStackParamList = {
  Home: undefined;
  Login: undefined;
  Settings: undefined;
  BottomTabs: undefined;
};

function MainStackNaavigation() {
  const MainStack = createNativeStackNavigator<MainStackParamList>();
  const loginData = useSelector((state: RootState) => getLogin(state));
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {loginData?.isLogin ? (
        <MainStack.Group>
          <MainStack.Screen name="BottomTabs" component={BottomTabs} />
        </MainStack.Group>
      ) : (
        <MainStack.Group>
          <MainStack.Screen name="Login" component={LoginScreen} />
        </MainStack.Group>
      )}
    </MainStack.Navigator>
  );
}

export default MainStackNaavigation;
