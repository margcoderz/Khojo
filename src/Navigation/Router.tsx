import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStackNaavigation from './StackNavigation/MainStackNaavigation';

function Router() {
  return (
    <NavigationContainer>
      <MainStackNaavigation />
    </NavigationContainer>
  );
}

export default Router;
