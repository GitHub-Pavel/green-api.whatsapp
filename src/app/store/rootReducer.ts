import { combineReducers } from '@reduxjs/toolkit';
import commonReducer from './slices/commonSlice';

const rootReducer = combineReducers({
    common: commonReducer,
});

export default rootReducer;