import * as actionTypes from '../actions/actionTypes';

const initialState = { user: null, loading: false, token: null };

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOADING:
      return { ...state, loading: true };
    case actionTypes.RESTORE_SESSION_REQUEST:
      return { ...state, loading: true };
    case actionTypes.RESTORE_SESSION_SUCCESS:
      return { ...state, loading: false };
    case actionTypes.RESTORE_SESSION_FAILED:
      return { ...state, loading: false };
    case actionTypes.SIGNUP_USER_REQUEST:
      return { ...state, loading: true };
    case actionTypes.SIGNUP_USER_SUCCESS:
      return { ...state, user: action.payload.user, loading: false };
    case actionTypes.SIGNUP_USER_FAILED:
      return { ...state, loading: false, error: action.payload.error };
    case actionTypes.SIGNIN_USER_SUCCESS:
      return { ...state, user: action.payload.user, loading: false };
    case actionTypes.SIGNIN_USER_FAILED:
      return { ...state, loading: false };
    case actionTypes.LOGIN_WORDPRESS_REQUEST:
      return { ...state, loading: true };
    case actionTypes.LOGIN_WORDPRESS_SUCCESS:
      return { ...state, loading: false, token: action.payload.token };
    case actionTypes.LOGIN_WORDPRESS_FAILED:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};
