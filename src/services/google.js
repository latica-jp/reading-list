import Expo from 'expo';

export const expoSignInWithGoogle = async () => {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '',
      iosClientId:
        '549445871117-u4fedc6gg5b9dtbc0p05bu61nfknmko5.apps.googleusercontent.com',
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
