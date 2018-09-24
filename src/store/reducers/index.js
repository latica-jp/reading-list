import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { auth } from './auth';
import { navigation } from './navigation';
import { book } from './book';
import { loading } from './loading';

const rootReducer = combineReducers({ auth, navigation, book, loading });

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['navigation', 'book'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
