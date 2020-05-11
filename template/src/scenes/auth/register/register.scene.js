import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { boundMethod } from 'autobind-decorator';
import _ from 'lodash';

import OtpScene, { OTP_TYPES } from '../otp/otp.scene';

export default class RegisterScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameError: '',
            passwordError: '',
            confirmPasswordError: ''
        };
    }

    static propTypes = {
        profile: PropTypes.object,
        isLoading: PropTypes.bool,
        signUp: PropTypes.func,
        setUsernameAction: PropTypes.func,
        setPasswordAction: PropTypes.func,
        setConfirmPasswordAction: PropTypes.func,
        navigation: PropTypes.object
    };

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.header}>Register</Text>
                {this.renderRegisterForm()}
            </View>
        );
    }

    renderRegisterForm() {
        const { usernameError, passwordError, confirmPasswordError } = this.state;
        const {
            profile = {},
            setUsernameAction,
            setPasswordAction,
            setConfirmPasswordAction,
            isLoading
        } = this.props;
        const { username, password, confirmPassword } = profile;
        return (
            <>
                <Input
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsernameAction}
                    errorMessage={usernameError}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPasswordAction}
                    errorMessage={passwordError}
                />
                <Input
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPasswordAction}
                    errorMessage={confirmPasswordError}
                />
                <Button
                    title="Create Account"
                    onPress={this.onCreateAccount}
                    loading={isLoading}
                    disabled={isLoading}
                />
            </>
        );
    }

    @boundMethod
    onCreateAccount() {
        const { signUp, profile = {} } = this.props;
        const { password, confirmPassword } = profile;

        const confirmPasswordError =
            password === confirmPassword
                ? null
                : 'Your password confirmation does not match the above password.';

        this.setState({ confirmPasswordError });

        if (signUp && confirmPasswordError === null) {
            signUp()
                .then(() => {
                    this.props.navigation.navigate(OtpScene.key, { type: OTP_TYPES.REGISTER });
                })
                .catch((error) => {
                    const { errors } = error;
                    this.setState({
                        usernameError: _.has(errors, 'username')
                            ? `Username ${_.join(errors.username, ', ')}`
                            : null,
                        passwordError: _.has(errors, 'password')
                            ? `Password ${_.join(errors.password, ', ')}`
                            : null,
                        confirmPasswordError: _.has(errors, 'confirm_password')
                            ? `Confirm Password ${_.join(errors.confirm_password, ', ')}`
                            : null
                    });
                });
        }
    }
}

RegisterScene.key = 'Register';

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
