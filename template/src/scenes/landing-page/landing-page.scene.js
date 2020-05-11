import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { boundMethod } from 'autobind-decorator';

import { NAVIGATORS } from '../../navigation/app-navigation.component';

export default class LandingPageScene extends Component {
    static propTypes = {
        checkIsSignedIn: PropTypes.func,
        isLoading: PropTypes.bool,
        getUser: PropTypes.func,
        navigation: PropTypes.object
    };

    componentDidMount() {
        const { navigation } = this.props;
        this.focus = navigation.addListener('focus', () => {
            this.onFocus();
        });
    }

    componentWillUnmount() {
        this.focus = null;
    }

    render() {
        return (
            <View container={styles.containerStyle}>
                <Text>Landing Page Loading</Text>
            </View>
        );
    }

    @boundMethod
    onFocus() {
        const { checkIsSignedIn, isLoading, getUser, navigation } = this.props;
        if (checkIsSignedIn) {
            checkIsSignedIn().then((isSignedIn) => {
                if (isSignedIn && !isLoading) {
                    if (getUser) {
                        getUser()
                            .then(() => {
                                navigation.navigate(NAVIGATORS.APP);
                            })
                            .catch(() => {
                                navigation.navigate(NAVIGATORS.AUTH);
                            });
                    }
                } else {
                    navigation.navigate(NAVIGATORS.AUTH);
                }
            });
        }
    }
}

LandingPageScene.key = 'LandingPage';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    }
});
