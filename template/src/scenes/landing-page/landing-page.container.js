import LandingPageScene from './landing-page.scene';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { checkIsSignedIn, getUser } from '../../reducers/user-reducer/user.actions';

export function mapStateToProps({ userReducer, appReducer }) {
    return {
        isSignedIn: userReducer.isSignedIn,
        isLoading: appReducer.isLoading,
        profile: { ...userReducer }
    };
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            checkIsSignedIn,
            getUser
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LandingPageScene);
