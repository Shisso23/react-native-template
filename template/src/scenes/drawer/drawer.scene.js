import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { boundMethod } from 'autobind-decorator';

import colors from '../../../theme/colors';
import { NAVIGATORS } from '../../navigation/app-navigation.component';
import HomeScene from '../app/home/home.scene';

export default class DrawerScene extends Component {
    constructor(props) {
        super(props);
        this.menuItems = [
            { title: 'Home', icon: 'home', action: this.onHome },
            { title: 'Logout', icon: 'sign-out', action: this.onLogout }
        ];
    }

    static propTypes = {
        navigation: PropTypes.object,
        signOut: PropTypes.func
    };

    @boundMethod
    onClosePress() {
        this.props.navigation.closeDrawer();
    }

    @boundMethod
    onHome() {
        this.props.navigation.navigate(NAVIGATORS.APP, { screen: HomeScene.key });
    }

    @boundMethod
    onLogout() {
        const { signOut } = this.props;
        if (signOut) {
            signOut();
        }
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={styles.viewStyle}>
                    <View style={styles.imageWrapper} />
                    <Button
                        icon={<Icon active name="arrow-right" style={styles.iconStyle} />}
                        type="clear"
                        onPress={this.onClosePress}
                        style={styles.closeButton}
                    />
                </SafeAreaView>
                {this.renderUserMenu()}
            </ScrollView>
        );
    }

    renderUserMenu() {
        return (
            <View>
                {this.menuItems.map((item, index) => (
                    <ListItem
                        key={index}
                        title={_.get(item, 'title')}
                        leftIcon={{
                            name: _.get(item, 'icon'),
                            type: _.get(item, 'iconType', 'font-awesome')
                        }}
                        onPress={_.get(item, 'action')}
                    />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        fontSize: 25,
        color: colors.blue
    },
    viewStyle: {
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    closeButton: {
        paddingBottom: 0,
        paddingTop: 0
    },
    imageWrapper: {
        marginLeft: 18
    }
});
