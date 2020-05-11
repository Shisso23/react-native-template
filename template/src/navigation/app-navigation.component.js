import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PropTypes from 'prop-types';

import LoadingContainer from '../scenes/loading/loading.scene';
import DrawerContainer from '../scenes/drawer/drawer.container';
import LandingPageContainer from '../scenes/landing-page/landing-page.container';
import HomeContainer from '../scenes/app/home/home.container';
import SignInContainer from '../scenes/auth/sign-in/sign-in.container';
import RegisterContainer from '../scenes/auth/register/register.container';
import ForgotPasswordContainer from '../scenes/auth/forgot-password/forgot-password.container';
import ResetPasswordContainer from '../scenes/auth/reset-password/reset-password.container';
import OtpContainer from '../scenes/auth/otp/otp.container';

import LandingPageScene from '../scenes/landing-page/landing-page.scene';
import HomeScene from '../scenes/app/home/home.scene';
import SignInScene from '../scenes/auth/sign-in/sign-in.scene';
import RegisterScene from '../scenes/auth/register/register.scene';
import ForgotPasswordScene from '../scenes/auth/forgot-password/forgot-password.scene';
import ResetPasswordScene from '../scenes/auth/reset-password/reset-password.scene';
import OtpScene from '../scenes/auth/otp/otp.scene';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const NAVIGATORS = {
    APP: 'App',
    AUTH: 'Auth'
};

AppContainer.propTypes = {
    isLoading: PropTypes.bool
};

export default function AppContainer(props) {
    const { isLoading } = props;
    return (
        <NavigationContainer>{isLoading ? renderLoadingScene() : renderApp()}</NavigationContainer>
    );
}

function renderLoadingScene() {
    return (
        <Stack.Navigator
            initialRouteName={LoadingContainer.key}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={LoadingContainer.key} component={LoadingContainer} />
        </Stack.Navigator>
    );
}

function renderApp() {
    return (
        <Stack.Navigator
            initialRouteName={LandingPageScene.key}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name={LandingPageScene.key}
                component={LandingPageContainer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NAVIGATORS.APP}
                component={HomeDrawerScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NAVIGATORS.AUTH}
                component={AuthStackScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function HomeDrawerScreen() {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContainer {...props} />}>
            <Drawer.Screen name={HomeScene.key} component={HomeContainer} />
        </Drawer.Navigator>
    );
}

function AuthStackScreen() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name={SignInScene.key} component={SignInContainer} />
            <AuthStack.Screen name={ForgotPasswordScene.key} component={ForgotPasswordContainer} />
            <AuthStack.Screen name={ResetPasswordScene.key} component={ResetPasswordContainer} />
            <AuthStack.Screen name={RegisterScene.key} component={RegisterContainer} />
            <AuthStack.Screen name={OtpScene.key} component={OtpContainer} />
        </AuthStack.Navigator>
    );
}
