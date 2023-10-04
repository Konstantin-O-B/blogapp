import { configureStore, combineReducers } from '@reduxjs/toolkit';

import blogAppSlice from './blogAppSlice';
import blogArticleSlice from './blogArticleSlice';
import blogUserSlice from './blogUserSlice';

const rootReducer = combineReducers({
  blogApp: blogAppSlice,
  blogArticle: blogArticleSlice,
  blogUser: blogUserSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
