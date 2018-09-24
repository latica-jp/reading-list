import axios from 'axios';

import { AuthSession } from 'expo';
import {
  WORDPRESS_CLIENT_ID,
  WORDPRESS_CLIENT_SECRET,
} from 'react-native-dotenv';

export const baseUrl = 'https://reading-list.latica.jp';
export const redirectUrlEncoded = encodeURIComponent(
  AuthSession.getRedirectUrl()
);
export const clientId = WORDPRESS_CLIENT_ID;
export const clientSecret = WORDPRESS_CLIENT_SECRET;

export const createBlogPostBody = summaries => {
  return summaries.reduce((content, summary) => {
    return `
      ${content}
      タイトル：${summary.title}
      著者：${summary.author}
      出版社：${summary.publisher}
      ${summary.cover ? `<img src="${summary.cover}" />` : ''}
      ${summary.itemCaption}
    `;
  }, '');
};

export const getWordpressAccessToken = async () => {
  const baseUrl = 'https://reading-list.latica.jp';
  const redirectUrlEncoded = encodeURIComponent(AuthSession.getRedirectUrl());
  const authUrl = `${baseUrl}/oauth/authorize?client_id=${WORDPRESS_CLIENT_ID}&redirect_uri=${redirectUrlEncoded}&response_type=code`;
  try {
    let result = await AuthSession.startAsync({ authUrl });
    const { code } = result.params;
    result = await axios.post(`${baseUrl}/oauth/token`, {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUrlEncoded,
      code: code,
      grant_type: 'authorization_code',
    });
    const { access_token: token } = result.data;
    if (isValidWordpressToken(token)) {
      return token;
    } else {
      throw new Error(`invalid token: ${token}`);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const isValidWordpressToken = token => {
  const [match] = token.match(/^[a-z0-9]{40}$/);
  return match !== null;
};
