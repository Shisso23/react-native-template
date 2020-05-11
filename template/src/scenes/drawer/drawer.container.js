import { connect } from 'react-redux';

import DrawerScene from './drawer.scene';
import { bindActionCreators } from 'redux';
import { signOut } from '../../reducers/user-reducer/user.actions';

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            signOut
        },
        dispatch
    );
}

export default connect(
    undefined,
    mapDispatchToProps
)(DrawerScene);
