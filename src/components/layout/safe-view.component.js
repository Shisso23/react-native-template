import React, { Component } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default class SafeView extends Component {
    render() {
        const { children, style } = this.props;

        return <SafeAreaView style={[styles.view, style]}>{children}</SafeAreaView>;
    }
}

SafeView.propTypes = {
    ...ViewPropTypes,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])
};

const styles = StyleSheet.create({
    view: {
        width
    }
});
