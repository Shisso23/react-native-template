import SignInScene from './sign-in.scene';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signIn } from '../../../reducers/user-reducer/user.actions';
import { setLoginAction, setPasswordAction } from '../../../reducers/user-reducer/user.reducer';

export function mapStateToProps({ userReducer }) {
    return {
        isLoading: userReducer.isLoading,
        profile: { ...userReducer }
    };
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            signIn,
            setLoginAction,
            setPasswordAction
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInScene);
