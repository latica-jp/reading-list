import { AuthSession } from 'expo';

export const baseUrl = 'https://reading-list.latica.jp';
export const redirectUrlEncoded = encodeURIComponent(
  AuthSession.getRedirectUrl()
);
export const clientId = 'vmcZjRlPL2Nk0qiFNohvpMZhNOB6cSiHevGxn2n9';
export const clientSecret = '4bt4BMKpa1UzOUQBIsIVk1Czwj7Tmv2qGwviigHt';

export const createBlogPostBody = summaries => {
  return summaries.reduce((content, summary) => {
    return `
      ${content}
      タイトル：${summary.title}
      著者：${summary.author}
      出版社：${summary.publisher}
      ${summary.cover ? `<img src="${summary.cover}" />` : ''}
    `;
  }, '');
};
