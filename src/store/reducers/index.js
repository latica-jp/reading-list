import { combineReducers } from 'redux';

import { auth } from './auth';
import { navigation } from './navigation';
import { book } from './book';
import { loading } from './loading';

const rootReducer = combineReducers({ auth, navigation, book, loading });

export default rootReducer;
