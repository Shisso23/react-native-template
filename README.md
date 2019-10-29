# :rocket: Codehesion React Native Template
This project is a React Native boilerplate that we use at Codehesion to kickstart a mobile application.

The boilerplate provides an architecture optimized for building cross-platform mobile applications through separation of concerns between the UI and business logic.

## Requirements

Node 8 or greater is required. Development for iOS requires a Mac and Xcode 9 or up, and will target iOS 9 and up.

You also need to install the dependencies required by React Native:

- for [Android development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3)
- for [iOS development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies)

## Installation
First, add the following to your `.npmrc` file to allow npm to use the Codehesion package repo (more info on the `.npmrc` file can be found [here](https://docs.npmjs.com/files/npmrc)):
```
@codehesionza:registry=https://gitlab.com/api/v4/packages/npm/
```

Then, run the following command (changing `MyApp` to the name of your app):
```
npx react-native init MyApp --template @codehesionza/react-native-template-codehesion
```

## Content

The boilerplate contains:

- a [React Native](https://facebook.github.io/react-native/) (v**0.61.2**) application (in "[ejected](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md)" mode to allow using dependencies that rely on native code)
- a [clear directory layout](#directory-layout) to provide a base architecture for your application
- [Redux](https://redux.js.org/) (v4.0.1) to help manage state
- [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) (v4.1.0-beta.5), a state based navigation library with a [`Router`](template/src/Router.js) to handle routing and navigation in the app
- [axios](https://github.com/axios/axios) to make API calls (v0.18.0)
- [prettier](https://prettier.io/) and [eslint](https://eslint.org/) preconfigured for React Native
- [React Native Elements](https://react-native-elements.github.io/react-native-elements/) (v1.2.5) to provide styled components and theming functionality in the app
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) (v6.6.0) to provide a choice of vector icons for use in the app


## Directory layout

- [`src/components`](template/src/components): reusable components
- [`src/config`](template/src/config.js): configuration of the application
- [`src/assets`](template/assets): assets (image, audio files, ...) used by the application
- [`src/scenes`](template/src/scenes): the application's scenes and container components
- [`src/services`](template/src/services): application services, e.g. API clients
- [`src/reducers`](template/src/reducers): redux [actions, reducers and stores](https://redux.js.org/basics)
- [`theme`](template/theme): base styles and colors for the application

## Note on the legacy CLI
Please note, this template only works with the new CLI. Make sure you have uninstalled the legacy `react-native-cli` first (`npm uninstall -g react-native-cli`), for the above command to work. If you wish to not use `npx`, you can also install the new CLI globally (`npm i -g @react-native-community/cli` or `yarn global add @react-native-community/cli`).

Further information can be found here: https://github.com/react-native-community/cli#about
