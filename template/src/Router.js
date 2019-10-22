import React from 'react';
import { StyleSheet } from 'react-native';
import { Lightbox, Router, Scene, Stack } from 'react-native-router-flux';
import { connect } from 'react-redux';

import NavBar from './components/common/nav-bar.component';
import ModalLightbox from './scenes/modal-lightbox/modal.lightbox';
import NavBarBack from './components/common/nav-bar-back.component';
import HomeScene from './scenes/home/home.scene';

const RouterWithRedux = connect()(Router);

const RouterComponent = () => {
    return (
        <RouterWithRedux navigationBarStyle={styles.navBar} navBar={NavBar}>
            <Lightbox>
                <Stack key="root">
                    <Scene
                        key={HomeScene.key}
                        component={HomeScene}
                        title="Home"
                        initial
                        hideNavBar={false}
                    />
                </Stack>
                <Scene
                    key={ModalLightbox.key}
                    component={ModalLightbox}
                    title="Modal"
                    hideNavBar={false}
                    navBar={NavBarBack}
                />
            </Lightbox>
        </RouterWithRedux>
    );
};

export default RouterComponent;

const styles = StyleSheet.create({
    navBar: {
        paddingTop: 30
    }
});
