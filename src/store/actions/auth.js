import * as firebase from 'firebase';
import axios from 'axios';
import { Alert } from 'react-native';
import * as actionTypes from './actionTypes';
import { auth } from '../../services/firebase';
import { delayedAlert } from '../../Utils/utils';
import { AuthSession } from 'expo';

export const restoreSession = () => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      dispatch(restoreSessionRequest(user));
      if (user) {
        dispatch(restoreSessionSuccess(user));
      } else {
        dispatch(restoreSessionFailed());
      }
    });
  };
};

export const restoreSessionRequest = user => {
  return {
    type: actionTypes.RESTORE_SESSION_REQUEST,
    payload: {
      user,
    },
  };
};

export const restoreSessionSuccess = user => {
  return {
    type: actionTypes.RESTORE_SESSION_SUCCESS,
    payload: {
      user,
    },
  };
};

export const restoreSessionFailed = () => {
  return {
    type: actionTypes.RESTORE_SESSION_FAILED,
  };
};

export const signUp = (email, password) => {
  return async dispatch => {
    dispatch(signUpRequest());
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      dispatch(signUpSuccess(user));
    } catch (error) {
      dispatch(signUpFailed(error));
    }
  };
};

export const signUpRequest = () => {
  return {
    type: actionTypes.SIGNUP_REQUEST,
  };
};

export const signUpSuccess = user => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    payload: { user },
  };
};

export const signUpFailed = error => {
  delayedAlert(error.message);
  return {
    type: actionTypes.SIGNUP_FAILED,
    payload: { error },
  };
};

export const signInWithEmail = (email, password) => {
  return async dispatch => {
    dispatch(signInRequest());
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      dispatch(signInSuccess(user));
    } catch (error) {
      dispatch(signInFailed(error));
    }
  };
};

export const signInWithGoogle = token => {
  return async dispatch => {
    dispatch(signInRequest());
    const credential = firebase.auth.GoogleAuthProvider.credential(null, token);
    try {
      const { user } = await auth.signInAndRetrieveDataWithCredential(
        credential
      );
      dispatch(signInSuccess(user));
    } catch (error) {
      dispatch(signInFailed(error));
    }
  };
};

export const signInRequest = () => {
  return {
    type: actionTypes.SIGNIN_REQUEST,
  };
};

export const signInSuccess = user => {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    payload: {
      user,
    },
  };
};

export const signInFailed = error => {
  return {
    type: actionTypes.SIGNIN_FAILED,
    payload: {
      error,
    },
  };
};

export const signOut = () => {
  return async dispatch => {
    dispatch(signOutRequest());
    try {
      await auth.signOut();
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailed(error));
    }
  };
};

export const signOutRequest = () => {
  return {
    type: actionTypes.SIGNOUT_REQUEST,
  };
};

export const signOutSuccess = () => {
  return {
    type: actionTypes.SIGNOUT_SUCCESS,
  };
};

export const signOutFailed = error => {
  return {
    type: actionTypes.SIGNOUT_FAILED,
    error,
  };
};

export const loginWordpress = () => {
  return async dispatch => {
    dispatch(loginWordpressRequest());

    const baseUrl = 'https://reading-list.latica.jp';
    const redirectUrlEncoded = encodeURIComponent(AuthSession.getRedirectUrl());
    const clientId = 'vmcZjRlPL2Nk0qiFNohvpMZhNOB6cSiHevGxn2n9';
    const clientSecret = '4bt4BMKpa1UzOUQBIsIVk1Czwj7Tmv2qGwviigHt';
    console.log(AuthSession.getRedirectUrl());
    try {
      let result = await AuthSession.startAsync({
        authUrl: `${baseUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrlEncoded}&response_type=code`,
      });
      const { code } = result.params;
      result = await axios.post(`${baseUrl}/oauth/token`, {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUrlEncoded,
        code: code,
        grant_type: 'authorization_code',
      });
      const { access_token: token } = result.data;

      dispatch(loginWordpressSuccess(token));
    } catch (error) {
      dispatch(loginWordpressFailed(error));
    }
  };
};

export const loginWordpressRequest = () => {
  return {
    type: actionTypes.LOGIN_WORDPRESS_REQUEST,
  };
};

export const loginWordpressSuccess = token => {
  return {
    type: actionTypes.LOGIN_WORDPRESS_SUCCESS,
    payload: { token },
  };
};

export const loginWordpressFailed = error => {
  return {
    type: actionTypes.LOGIN_WORDPRESS_FAILED,
    payload: { error },
  };
};
