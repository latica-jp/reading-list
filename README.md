This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## このプロジェクトについて

- このプロジェクトは、latica-jp がポートフォリオの一部として作例を公開する iOS / Android アプリ（Expo 上で動作）のソースコード公開を目的としています。

## 機能

- 書籍のバーコード（ISBN）を読み取り、書籍情報を取得してリストに追加します。
- Wordpress にログインして、 書籍リストを記事として投稿します。

## Wordpress 認証

- [WP OAuth Server](https://wordpress.org/plugins/oauth2-provider/) を使用して Wordpress を OAuth サーバとして使用することが前提です。

## 動作サンプル（Expo）

- [Expo](https://expo.io/@latica/reading-list)
  - Expo アプリをダウンロード、上記ページに表示される QR コードをスキャンすると動作を確認できます。
  - 上記の Expo プロジェクトは非公開です（利用できますが、プロジェクト検索の対象外です）

## Tech stacks

- React Native
- expo
- Redux
- React Navigation
- Native Base
- Firebase Auth
