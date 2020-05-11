import { combineReducers } from 'redux';

import userReducer from './user-reducer/user.reducer';
import appReducer from './app-reducer/app.reducer';

export default combineReducers({ userReducer, appReducer });
