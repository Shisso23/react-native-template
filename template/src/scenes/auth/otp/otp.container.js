import OtpScene from './otp.scene';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    sendOtp,
    sendResetOtp,
    verifyOtp,
    verifyResetOtp
} from '../../../reducers/user-reducer/user.actions';

export function mapStateToProps({ userReducer }) {
    return {
        isLoading: userReducer.isLoading
    };
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            sendOtp,
            verifyOtp,
            sendResetOtp,
            verifyResetOtp
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OtpScene);
