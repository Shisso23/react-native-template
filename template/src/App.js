import React, { Component } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers/root.reducer';
import theme from '../theme/theme';
import AppContainer from './navigation/app-navigation.container';
import { applyMiddleware, createStore } from 'redux';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </ThemeProvider>
        );
    }
}
