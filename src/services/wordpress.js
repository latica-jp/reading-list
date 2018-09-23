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
