import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleSheet, Text, View } from 'react-native';
import { I18nextProvider } from 'react-i18next';

import { AppNavigator } from './src/screens';
import i18n from './src/config/i18n';
import { store, persistor } from './src/store/configureStore';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator screenProps={{ t: i18n.getFixedT() }} />
        </PersistGate>
      </Provider>
    );
  }
}
