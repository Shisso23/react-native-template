import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { boundMethod } from 'autobind-decorator';

import OtpScene, { OTP_TYPES } from '../otp/otp.scene';

export default class ForgotPasswordScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: ''
        };
    }

    static propTypes = {
        isLoading: PropTypes.bool,
        login: PropTypes.string,
        forgotPassword: PropTypes.func,
        setLoginAction: PropTypes.func,
        navigation: PropTypes.object
    };

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.header}>Forgot Password</Text>
                {this.renderForgotPasswordForm()}
            </View>
        );
    }

    renderForgotPasswordForm() {
        const { loginError } = this.state;
        const { login, setLoginAction, isLoading } = this.props;
        return (
            <>
                <Input
                    placeholder="Login"
                    value={login}
                    onChangeText={setLoginAction}
                    errorMessage={loginError}
                />
                <Button
                    title="Forgot Password"
                    onPress={this.onForgotPassword}
                    raised
                    loading={isLoading}
                    disabled={isLoading}
                />
            </>
        );
    }

    @boundMethod
    onForgotPassword() {
        const { forgotPassword } = this.props;
        if (forgotPassword) {
            forgotPassword()
                .then(() => {
                    this.props.navigation.navigate(OtpScene.key, { type: OTP_TYPES.FORGOT });
                })
                .catch(() => {
                    this.setState({ loginError: 'Server error, please try again.' });
                });
        }
    }
}

ForgotPasswordScene.key = 'ForgotPassword';

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
