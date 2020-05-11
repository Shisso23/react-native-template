import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default class LoadingScene extends Component {
    render() {
        return (
            <View container={styles.containerStyle}>
                <ActivityIndicator animating />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    }
});

LoadingScene.key = 'Loading';
