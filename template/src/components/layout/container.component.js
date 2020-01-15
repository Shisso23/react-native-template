import React, { Component } from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

export default class Container extends Component {
    render() {
        const { children, style } = this.props;

        return <View style={[styles.container, style]}>{children}</View>;
    }
}

Container.propTypes = {
    ...ViewPropTypes,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
