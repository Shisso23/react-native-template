import ResetPasswordScene from './reset-password.scene';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resetPassword } from '../../../reducers/user-reducer/user.actions';
import {
    setPasswordAction,
    setConfirmPasswordAction
} from '../../../reducers/user-reducer/user.reducer';

export function mapStateToProps({ userReducer }) {
    return {
        isLoading: userReducer.isLoading,
        password: userReducer.password,
        confirmPassword: userReducer.confirmPassword
    };
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            resetPassword,
            setPasswordAction,
            setConfirmPasswordAction
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordScene);
