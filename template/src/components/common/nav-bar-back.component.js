import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import TopBar from './top-bar.component';

export default class NavBarBack extends Component {
    static onNavPress() {
        Actions.pop();
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
