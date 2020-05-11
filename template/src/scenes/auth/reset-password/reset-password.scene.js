import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { boundMethod } from 'autobind-decorator';
import _ from 'lodash';

import LandingPageScene from '../../landing-page/landing-page.scene';

export default class ResetPasswordScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordError: '',
            confirmPasswordError: ''
        };
    }

    static propTypes = {
        isLoading: PropTypes.bool,
        password: PropTypes.string,
        confirmPassword: PropTypes.string,
        resetPassword: PropTypes.func,
        setPasswordAction: PropTypes.func,
        setConfirmPasswordAction: PropTypes.func,
        navigation: PropTypes.object
    };

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.header}>Reset Password</Text>
                {this.renderResetPasswordForm()}
            </View>
        );
    }

    renderResetPasswordForm() {
        const { passwordError, confirmPasswordError } = this.state;
        const {
            password,
            confirmPassword,
            setPasswordAction,
            setConfirmPasswordAction,
            isLoading
        } = this.props;
        return (
            <>
                <Input
                    placeholder="New Password"
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
                    title="Reset Password"
                    onPress={this.onResetPassword}
                    raised
                    loading={isLoading}
                    disabled={isLoading}
                />
            </>
        );
    }

    @boundMethod
    onResetPassword() {
        const { password, confirmPassword, resetPassword } = this.props;

        const confirmPasswordError =
            password === confirmPassword
                ? null
                : 'Your password confirmation does not match the above password.';

        this.setState({ confirmPasswordError });

        if (resetPassword) {
            resetPassword()
                .then(() => {
                    this.props.navigation.navigate(LandingPageScene.key);
                })
                .catch((error) => {
                    const { errors } = error;
                    this.setState({
                        confirmPasswordError: errors ? _.join(errors, ', ') : null
                    });
                });
        }
    }
}

ResetPasswordScene.key = 'ResetPassword';

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
