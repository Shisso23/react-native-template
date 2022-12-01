import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { HomePage, ProfilePage, TermsAndConditionsPage } from '../../components';
import { useTheme } from '../../hooks';
import { AppStackList, DrawerList } from './types';
import {AuthNavigator} from "../auth";

const AppStack = createStackNavigator<AppStackList>();
const Drawer = createDrawerNavigator<DrawerList>();



export const AppNavigator = () => {
  const { Navigator } = useTheme();

  return (
    <AppStack.Navigator screenOptions={Navigator.globalNavigatorScreenOptions}>
      <AppStack.Screen
        name="App Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen name="TermsAndConditions" component={TermsAndConditionsPage} />
    </AppStack.Navigator>
  );
};

const DrawerNavigator = () => {
  const { Navigator } = useTheme();

  return (
    <Drawer.Navigator screenOptions={Navigator.globalNavigatorScreenOptions}>
      <Drawer.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: true, title: 'Home' }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: true, title: 'Profile' }}
      />
    </Drawer.Navigator>
  );
};
