import RegisterScene from './register.scene';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signUp } from '../../../reducers/user-reducer/user.actions';
import {
    setUsernameAction,
    setPasswordAction,
    setConfirmPasswordAction
} from '../../../reducers/user-reducer/user.reducer';

export function mapStateToProps({ userReducer }) {
    return {
        isLoading: userReducer.isLoading,
        profile: { ...userReducer }
    };
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            signUp,
            setUsernameAction,
            setPasswordAction,
            setConfirmPasswordAction
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterScene);
