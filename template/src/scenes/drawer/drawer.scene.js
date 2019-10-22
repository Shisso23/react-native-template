import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Icon, ListItem } from 'react-native-elements';
import _ from 'lodash';

import colors from '../../../theme/colors';
import HomeScene from '../home/home.scene';

export default class DrawerScene extends Component {
    constructor(props) {
        super(props);

        this.menuItems = [
            { title: 'Home', icon: 'home', action: DrawerScene.onHome }
        ];
    }
    static onClosePress() {
        Actions.drawerClose();
    }

    static onHome() {
        Actions[HomeScene.key].call();
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={styles.viewStyle}>
                    <View style={styles.imageWrapper} />
                    <Button
                        icon={<Icon active name="arrow-right" style={styles.iconStyle} />}
                        type="clear"
                        onPress={DrawerScene.onClosePress}
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

DrawerScene.key = 'drawer';
