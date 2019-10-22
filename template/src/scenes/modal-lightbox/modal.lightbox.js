import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import colors from '../../../theme/colors';
import { boundMethod } from 'autobind-decorator';

export default class ModalLightbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(0)
        };
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, {
            duration: 200,
            toValue: 1
        }).start();
    }

    render() {
        return (
            <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
                {this.renderLightBox()}
            </Animated.View>
        );
    }

    @boundMethod
    closeModal() {
        Animated.timing(this.state.opacity, {
            duration: 200,
            toValue: 0
        }).start(Actions.pop);
    }

    renderLightBox() {
        const { buttons = [], content, headerColour = colors.grey, title } = this.props;

        return (
            <View style={styles.lightbox}>
                <View style={[styles.lightboxHeaderView, { backgroundColor: headerColour }]}>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                <ScrollView style={styles.textWrapper}>
                    <View style={styles.contentContainer}>
                        {typeof content === 'string' ? (
                            <Text style={styles.contentText}>{content}</Text>
                        ) : (
                            content
                        )}
                    </View>
                </ScrollView>
                <View style={styles.buttonsContainer}>
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            onPress={button.action}
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.buttonTextStyle}
                            title={button.title}
                        />
                    ))}
                    <Button title="Close" onPress={this.closeModal} style={styles.buttonStyle} />
                </View>
            </View>
        );
    }
}

ModalLightbox.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            action: PropTypes.func
        })
    ),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    headerColour: PropTypes.string,
    title: PropTypes.string
};

ModalLightbox.key = 'modalLightbox';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundGrey50,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lightbox: {
        width: 300,
        maxHeight: 400,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    textWrapper: {
        padding: 15,
        flexGrow: 0
    },
    lightboxHeaderView: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: 300,
        marginTop: -10,
        paddingTop: 5,
        backgroundColor: colors.grey
    },
    headerText: {
        padding: 10,
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 18,
        color: colors.white
    },
    contentContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonStyle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        fontSize: 14,
        color: colors.grey
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    contentText: {
        fontWeight: '600'
    }
});
