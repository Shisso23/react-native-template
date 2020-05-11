import React, { Component } from 'react';
import { StyleSheet, Text, View, BackHandler, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { boundMethod } from 'autobind-decorator';

import { NAVIGATORS } from '../../../navigation/app-navigation.component';
import HomeScene from '../../app/home/home.scene';
import RegisterScene from '../register/register.scene';
import ForgotPasswordScene from '../forgot-password/forgot-password.scene';

export default class SignInScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: '',
            passwordError: ''
        };
    }

    static propTypes = {
        isLoading: PropTypes.bool,
        profile: PropTypes.object,
        signIn: PropTypes.func,
        setLoginAction: PropTypes.func,
        setPasswordAction: PropTypes.func,
        navigation: PropTypes.object
    };

    componentDidMount() {
        const { navigation } = this.props;
        this.focus = navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', this.backAction);
        });

        this.blur = navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress', this.backAction);
        });
    }

    componentWillUnmount() {
        this.focus = null;
        this.blur = null;
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.header}>Sign In</Text>
                {this.renderSignInForm()}
                <Button title="Forgot Password" onPress={this.onForgotPassword} />
                <Button title="Register" onPress={this.onRegister} />
            </View>
        );
    }

    renderSignInForm() {
        const { loginError, passwordError } = this.state;
        const { profile = {}, setLoginAction, setPasswordAction, isLoading } = this.props;
        const { login, password } = profile;
        return (
            <>
                <Input
                    placeholder="Login"
                    value={login}
                    onChangeText={setLoginAction}
                    errorMessage={loginError}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPasswordAction}
                    errorMessage={passwordError}
                />
                <Button
                    title="Login"
                    onPress={this.onLogin}
                    raised
                    loading={isLoading}
                    disabled={isLoading}
                />
            </>
        );
    }

    @boundMethod
    onLogin() {
        const { signIn } = this.props;
        if (signIn) {
            signIn()
                .then(() => {
                    this.props.navigation.navigate(NAVIGATORS.APP, { screen: HomeScene.key });
                })
                .catch(() => {
                    this.setState({ passwordError: 'Email/Mobile and Password do not match' });
                });
        }
    }

    @boundMethod
    onForgotPassword() {
        this.props.navigation.navigate(ForgotPasswordScene.key);
    }

    @boundMethod
    onRegister() {
        this.props.navigation.navigate(RegisterScene.key);
    }

    @boundMethod
    backAction() {
        Alert.alert('Hold on!', 'You are about to exit the app. Would you like to continue?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel'
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    }
}

SignInScene.key = 'SignIn';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        padding: 20
    },
    header: {
        alignSelf: 'center',
        fontSize: 24
    }
});
