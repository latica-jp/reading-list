import { Alert } from 'react-native';

export const delayedAlert = (...params) => {
  setTimeout(() => {
    Alert.alert(...params);
  }, 100);
};
