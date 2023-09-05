import { combineReducers } from 'redux';

import books from './books';
import auth from './auth';
import review from './auth';

export const reducers = combineReducers({ books, auth , review});
