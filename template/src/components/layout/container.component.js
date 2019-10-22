import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const deviceHeight = Dimensions.get('window').height;

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
        height: Platform.OS === 'ios' ? deviceHeight : deviceHeight - 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
