import { connect } from 'react-redux';

import AppNavigation from './app-navigation.component';

export function mapStateToProps({ userReducer, appReducer }) {
    return {
        isSignedIn: userReducer.isSignedIn,
        isLoading: appReducer.isLoading
    };
}

export default connect(
    mapStateToProps,
    undefined
)(AppNavigation);
