import { Alert } from 'react-native';

// react-native-loading-spinner-overlay に alert と併用すると
// spinner が止まらない不具合があり、以下がその回避策
// https://github.com/joinspontaneous/react-native-loading-spinner-overlay/issues/61
export const delayedAlert = (...params) => {
  setTimeout(() => {
    Alert.alert(...params);
  }, 100);
};
