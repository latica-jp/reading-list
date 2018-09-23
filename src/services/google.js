import Expo from 'expo';
import { GOOGLE_IOS_CLIENT_ID } from 'react-native-dotenv';

export const expoSignInWithGoogle = async () => {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '',
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      scopes: ['profile', 'email'],
    });
    if (result.type === 'success') {
      return result.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
