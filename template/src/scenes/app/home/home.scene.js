import React, { Component } from 'react';
import { BackHandler, StyleSheet, Text, View, Alert } from 'react-native';
import { boundMethod } from 'autobind-decorator';

import Container from '../../../components/layout/container.component';
import PropTypes from 'prop-types';

export default class HomeScene extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };

    componentDidMount() {
        const { navigation } = this.props;
        this.focus = navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', this.backAction);
        });

        this.blur = navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress', this.backAction);
        });
    }

    componentWillUnmount() {
        this.focus = null;
        this.blur = null;
    }

    render() {
        return (
            <Container>
                <View style={styles.containerStyle}>
                    <Text>Home</Text>
                </View>
            </Container>
        );
    }

    @boundMethod
    backAction() {
        Alert.alert('Hold on!', 'You are about to exit the app. Would you like to continue?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel'
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    }
}

HomeScene.key = 'Home';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    }
});
