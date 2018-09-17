import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../store/reducers';
import thunk from 'redux-thunk';
import { navigationMiddleware } from '../screens';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  rootReducer,
  // redux devtools extention を有効にする
  composeWithDevTools(applyMiddleware(thunk, navigationMiddleware))
);
