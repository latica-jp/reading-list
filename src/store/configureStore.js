import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from '../store/reducers';
import thunk from 'redux-thunk';
import { navigationMiddleware } from '../screens';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  // redux devtools extention を有効にする
  composeWithDevTools(applyMiddleware(thunk, navigationMiddleware))
);
const persistor = persistStore(store);

export { store, persistor };
