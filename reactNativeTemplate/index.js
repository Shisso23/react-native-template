import React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { Provider } from 'react-redux';

import { name as appName } from './app.json';
import theme from './src/theme/react-native-elements-theme';
import { store } from './src/reducers/store';
import App from './src/App';

const Root = () => (
  <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => Root);
