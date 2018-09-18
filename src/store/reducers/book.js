import * as actionTypes from '../actions/actionTypes';

const initialState = {
  summary: '',
  summaries: [],
  error: '',
};

export const book = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_BOOKDATA:
      return initialState;
    case actionTypes.CLEAR_SUMMARY:
      return {
        ...state,
        summary: '',
      };
    case actionTypes.FETCH_BOOKDATA_SUCCESS:
      return {
        ...state,
        summary: action.payload.summary,
        summaries: state.summaries.concat(action.payload.summary),
        error: '',
      };
    case actionTypes.FETCH_BOOKDATA_FAILED:
      return {
        ...state,
        summary: action.payload.summary,
        error: action.payload.error,
      };
    case actionTypes.DELETE_BOOKDATA:
      return {
        ...state,
        summaries: state.summaries.filter(
          summary => summary.isbn != action.payload.isbn
        ),
      };
    case actionTypes.UPLOAD_BOOKDATA_SUCCESS:
      return state;
    case actionTypes.UPLOAD_BOOKDATA_FAILED:
      return state;
    default:
      return state;
  }
};
