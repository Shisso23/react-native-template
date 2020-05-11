import ForgotPasswordScene from './forgot-password.scene';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { forgotPassword } from '../../../reducers/user-reducer/user.actions';
import { setLoginAction } from '../../../reducers/user-reducer/user.reducer';

export function mapStateToProps({ userReducer }) {
    return {
        isLoading: userReducer.isLoading,
        login: userReducer.login
    };
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            forgotPassword,
            setLoginAction
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordScene);
