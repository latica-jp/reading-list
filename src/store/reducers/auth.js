import * as actionTypes from '../actions/actionTypes';

const initialState = { user: null, token: null, error: null };

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESTORE_SESSION_SUCCESS:
      return { ...state, user: action.payload.user };
    case actionTypes.RESTORE_SESSION_FAILED:
      return { ...state, error: action.payload.error };
    case actionTypes.SIGNUP_SUCCESS:
      return { ...state, user: action.payload.user };
    case actionTypes.SIGNUP_FAILED:
      return { ...state, error: action.payload.error };
    case actionTypes.SIGNIN_SUCCESS:
      return { ...state, user: action.payload.user };
    case actionTypes.SIGNIN_FAILED:
      return { ...state, error: action.payload.error };
    case actionTypes.SIGNOUT_SUCCESS:
      return { ...state, user: null };
    case actionTypes.SIGNOUT_FAILED:
      return { ...state, error: action.payload.error };
    case actionTypes.LOGIN_WORDPRESS_SUCCESS:
      return { ...state, token: action.payload.token };
    case actionTypes.LOGIN_WORDPRESS_FAILED:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};
