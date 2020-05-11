import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { boundMethod } from 'autobind-decorator';
import { CodeField } from 'react-native-confirmation-code-field';
import _ from 'lodash';

import colors from '../../../../theme/colors';
import LandingPageScene from '../../landing-page/landing-page.scene';
import ResetPasswordScene from '../reset-password/reset-password.scene';

export const OTP_TYPES = {
    REGISTER: 'register',
    FORGOT: 'forgot'
};

export default class OtpScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            otpError: ''
        };
    }

    static propTypes = {
        isLoading: PropTypes.bool,
        sendOtp: PropTypes.func,
        verifyOtp: PropTypes.func,
        sendResetOtp: PropTypes.func,
        verifyResetOtp: PropTypes.func,
        navigation: PropTypes.object,
        route: PropTypes.object
    };

    componentDidMount() {
        this.onSendOtp();
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.header}>OTP</Text>
                <Text>We have just sent you an OTP number via SMS</Text>
                <Text>
                    Please enter the 4 digit number you have just received to verify your account.
                </Text>
                {this.renderOtpForm()}
                {this.renderResend()}
            </View>
        );
    }

    renderOtpForm() {
        const { otpError } = this.state;
        const { isLoading } = this.props;

        return (
            <>
                <CodeField
                    cellCount={4}
                    rootStyle={styles.rootStyle}
                    keyboardType="number-pad"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text key={index} style={[styles.cell, isFocused && styles.focusCell]}>
                            {symbol || (isFocused ? '|' : null)}
                        </Text>
                    )}
                    value={this.state.otp}
                    onChangeText={this.onChangeOtp}
                />
                {otpError !== null && otpError !== '' && (
                    <View>
                        <Text>{otpError}</Text>
                    </View>
                )}
                <Button
                    title="Verify OTP"
                    onPress={this.onVerifyOtp}
                    loading={isLoading}
                    disabled={isLoading}
                />
            </>
        );
    }

    renderResend() {
        return (
            <View>
                <Text>If you don&apos;t receive one momentarily, &nbsp;</Text>
                <TouchableOpacity onPress={this.onSendOtp}>
                    <Text style={styles.resend}>click here</Text>
                </TouchableOpacity>
                <Text> to resend.</Text>
            </View>
        );
    }

    @boundMethod
    onSendOtp() {
        const { sendOtp, sendResetOtp } = this.props;
        const { type } = this.props.route.params;
        if (type === OTP_TYPES.REGISTER && sendOtp) {
            sendOtp();
        } else if (type === OTP_TYPES.FORGOT && sendResetOtp) {
            sendResetOtp();
        }
    }

    @boundMethod
    onVerifyOtp() {
        const { type } = this.props.route.params;
        if (type === OTP_TYPES.REGISTER) {
            this.verifyOtp();
        } else if (type === OTP_TYPES.FORGOT) {
            this.verifyResetOtp();
        }
    }

    verifyOtp() {
        const { verifyOtp } = this.props;
        const { otp } = this.state;
        if (verifyOtp) {
            verifyOtp(otp)
                .then(() => {
                    this.props.navigation.navigate(LandingPageScene.key);
                })
                .catch((error) => {
                    const { errors } = error;
                    this.setState({
                        otpError: _.has(errors, 'otp') ? _.join(errors.otp, ', ') : null
                    });
                });
        }
    }

    verifyResetOtp() {
        const { verifyResetOtp } = this.props;
        const { otp } = this.state;
        if (verifyResetOtp) {
            verifyResetOtp(otp)
                .then((response) => {
                    this.props.navigation.navigate(ResetPasswordScene.key, {
                        token: _.get(response, 'data.token')
                    });
                })
                .catch((error) => {
                    const { errors } = error;
                    this.setState({
                        otpError: _.has(errors, 'otp') ? _.join(errors.otp, ', ') : null
                    });
                });
        }
    }

    @boundMethod
    onChangeOtp(otp) {
        this.setState({ otp });
    }
}

OtpScene.key = 'Otp';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        padding: 20
    },
    header: {
        alignSelf: 'center',
        fontSize: 24
    },
    cell: {
        width: 45,
        height: 45,
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        borderWidth: 1.5,
        borderRadius: 5,
        marginRight: 15,
        paddingTop: 8,
        borderColor: colors.black,
        textAlign: 'center'
    },
    focusCell: {
        borderColor: colors.grey
    },
    resend: {
        color: colors.grey
    }
});
