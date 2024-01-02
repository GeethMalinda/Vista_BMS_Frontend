import { combineReducers } from 'redux';

import books from './books';
import auth from './auth';
import review from './review';

export const reducers = combineReducers({ books, auth , review});
