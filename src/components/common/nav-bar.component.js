import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import TopBar from './top-bar.component';

export default class NavBar extends Component {
    static onNavPress() {
        Actions.drawerOpen();
    }

    render() {
        const { title } = this.props;

        return <TopBar title={title} leftButtonIcon="bars" leftButtonAction={NavBar.onNavPress} />;
    }
}

NavBar.propTypes = {
    title: PropTypes.string
};
