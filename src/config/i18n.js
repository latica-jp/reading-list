import i18n from 'i18next';
import Expo from 'expo';

// このあたりはサンプルのまま
// see: https://github.com/i18next/react-i18next/blob/master/example/react-native-expo/js/i18n.js
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    return Expo.DangerZone.Localization.getCurrentLocaleAsync().then(lng => {
      callback(lng.replace('_', '-'));
    });
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n.use(languageDetector).init({
  fallbackLng: 'en',
  // have a initial namespace
  ns: ['translation'],
  defaultNS: 'translation',
  keySeparator: false, // デフォルトは true、キーに文言を使いたい場合は false（理屈はよくわかっていない）
  resources: {
    en: {
      translation: {
        Home: 'Home',
        Books: 'Books',
        Barcode: 'Barcode',
        'No books yet.': 'No books yet.',
        'Book Detail': 'Book Detail',
        'Starting up...': 'Starting up...',
        Back: 'Back',
        Title: 'Title',
        Author: 'Author',
        Publisher: 'Publisher',
        Caption: 'Caption',
        'Connect to Wordpress': 'Connect to Wordpress',
        'Sign Out': 'Sign Out',
      },
    },
    ja: {
      translation: {
        Home: 'ホーム',
        Books: '書籍',
        Barcode: 'バーコード',
        'No books yet.': 'まだ書籍がありません。',
        'Book Detail': '書籍の詳細',
        'Starting up...': '起動しています...',
        Back: '戻る',
        Title: 'タイトル',
        Author: '著者',
        Publisher: '発行者',
        Caption: '詳細',
        'Connect to Wordpress': 'Wordpress に接続',
        'Sign Out': 'ログアウト',
      },
    },
  },
});

export default i18n;
