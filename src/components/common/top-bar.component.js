import React, { Component } from 'react';
import { Button, Header } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../../../theme/colors';

export default class TopBar extends Component {
    render() {
        const { title } = this.props;
        return (
            <Header
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: title, style: { color: colors.white } }}
            />
        );
    }

    renderLeftComponent() {
        const { leftButtonIcon, leftButtonAction, hitSlopOptions = {} } = this.props;
        if (!leftButtonIcon) {
            return null;
        }

        return (
            <Button
                icon={{ name: leftButtonIcon, color: colors.white, type: 'font-awesome' }}
                type="clear"
                hitSlop={hitSlopOptions}
                onPress={leftButtonAction}
            />
        );
    }
}

TopBar.propTypes = {
    leftButtonIcon: PropTypes.string,
    title: PropTypes.string,
    hitSlopOptions: PropTypes.object,

    leftButtonAction: PropTypes.func
};
