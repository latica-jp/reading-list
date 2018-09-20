import axios from 'axios';

export const fetchBookData = async isbn => {
  const result = await axios.get(
    'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404',
    { params: { isbn, format: 'json', applicationId: '1069810816468830398' } }
  );
  const { data } = result;
  if (result.data) {
    const {
      title,
      author,
      publisherName: publisher,
      isbn,
      itemCaption,
      largeImageUrl: cover,
    } = data.Items[0].Item;
    const coverOriginal = getOriginalImageUrl(cover);
    return {
      isbn,
      title,
      author,
      publisher,
      itemCaption,
      cover,
      coverOriginal,
    };
  } else if (result.error) {
    throw new Error(result.error);
  }
};

// largeImageUrl が https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/6243/9784041026243.jpg?_ex=200x200
// という形式で返ってくるので、サイズ指定なしの URL を取得する
const getOriginalImageUrl = imageUrl => {
  const [url] = imageUrl.split('?');
  return url || '';
};

export const getThumbnailUrl = (imageUrl, height) => {
  return `{imageUrl}?_ex=${height}x${height}`;
};
