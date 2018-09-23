import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { I18nextProvider } from 'react-i18next';

import { AppNavigator } from './src/screens';
import i18n from './src/config/i18n';
import store from './src/store/configureStore';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator screenProps={{ t: i18n.getFixedT() }} />
      </Provider>
    );
  }
}
