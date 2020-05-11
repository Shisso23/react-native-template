import React, { Component } from 'react';
import { NavigationActions } from '@react-navigation/compat';
import PropTypes from 'prop-types';

import TopBar from './top-bar.component';

export default class NavBarBack extends Component {
    static onNavPress() {
        NavigationActions.back();
    }

    render() {
        const { title } = this.props;

        return (
            <TopBar
                title={title}
                leftButtonIcon="arrow-back"
                leftButtonAction={NavBarBack.onNavPress}
            />
        );
    }
}

NavBarBack.propTypes = {
    title: PropTypes.string
};
