import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

import { RootReducer } from '../reducers';
import { AuthNavigator } from './auth';
import { AppNavigator } from './app';

const RootStack = createStackNavigator();

const AppContainer: React.FC = () => {
  const { isAuthenticated } = useSelector((reducer: RootReducer) => reducer.userAuthReducer);

  const onReady = () => RNBootSplash.hide();

  return (
    <NavigationContainer onReady={onReady}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="APP" component={AppNavigator} />
        ) : (
          <RootStack.Screen name="AUTH" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
