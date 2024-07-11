import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import Router from './Navigation/Router';
import {Provider} from 'react-redux';
import store from './Store/Store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <Router />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
