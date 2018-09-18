import { Linking } from 'react-native';
import * as actionTypes from './actionTypes';
import axios from 'axios';

import * as wordpress from '../../services/wordpress';

export const clearBookData = () => {
  return {
    type: actionTypes.CLEAR_BOOKDATA,
  };
};

export const clearSummary = () => {
  return {
    type: actionTypes.CLEAR_SUMMARY,
  };
};

export const fetchBookData = isbn => {
  return async dispatch => {
    dispatch(fetchBookDataRequest());
    try {
      const result = await axios.get(
        `https://api.openbd.jp/v1/get?isbn=${isbn}`,
        { timeout: 2000 }
      );
      const { summary } = result.data[0];
      dispatch(fetchBookDataSucess(summary));
    } catch (error) {
      dispatch(fetchBookDataFailed(error));
    }
  };
};

export const fetchBookDataRequest = () => {
  return {
    type: actionTypes.FETCH_BOOKDATA_REQUEST,
  };
};

export const fetchBookDataSucess = summary => {
  return {
    type: actionTypes.FETCH_BOOKDATA_SUCCESS,
    payload: { summary },
  };
};

export const fetchBookDataFailed = error => {
  return {
    type: actionTypes.FETCH_BOOKDATA_FAILED,
    payload: {
      summary: {
        title: '書籍情報を取得できませんでした。',
        author: error.message,
      },
    },
  };
};

export const deleteBookdata = isbn => {
  return {
    type: actionTypes.DELETE_BOOKDATA,
    payload: {
      isbn,
    },
  };
};

export const uploadBookData = () => {
  return async (dispatch, getState) => {
    dispatch(uploadBookDataRequest());
    const { summaries } = getState().book;
    const { token } = getState().auth;
    const content = wordpress.createBlogPostBody(summaries);
    try {
      const result = await axios.post(
        // Bearer token ではなく、URLにトークンを含める
        // https://wordpress.org/support/topic/oauth-signature-and-nonce/
        `${wordpress.baseUrl}/wp-json/wp/v2/posts?access_token=${token}`,
        {
          title: 'TEST',
          content,
          status: 'publish',
        },
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );
      dispatch(uploadBookDataSuccess());

      const { link } = result.data;
      Linking.openURL(link);
    } catch (error) {
      dispatch(uploadBookDataFailed(error));
    }
  };
};

export const uploadBookDataRequest = () => {
  return { type: actionTypes.UPLOAD_BOOKDATA_REQUEST };
};

export const uploadBookDataSuccess = () => {
  return { type: actionTypes.UPLOAD_BOOKDATA_SUCCESS };
};

export const uploadBookDataFailed = error => {
  return { type: actionTypes.UPLOAD_BOOKDATA_FAILED, payload: { error } };
};
