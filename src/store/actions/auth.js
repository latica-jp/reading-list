import * as firebase from 'firebase';
import * as actionTypes from './actionTypes';
import { auth } from '../../services/firebase';
import { delayedAlert } from '../../Utils/utils';
import { clearBookData } from './';
import { getWordpressAccessToken } from '../../services/wordpress';

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
      dispatch(clearBookData());
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
    try {
      const token = await getWordpressAccessToken();
      if (token) {
        dispatch(loginWordpressSuccess(token));
      } else {
        dispatch(loginWordpressFailed('error'));
      }
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
