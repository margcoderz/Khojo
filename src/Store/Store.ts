import {configureStore} from '@reduxjs/toolkit';
import themeSlice from '../Modules/ThemeModule/ThemeSlice/ThemeSlice';
import {posts} from './ApiSlice';

const store = configureStore({
  reducer: {
    theme: themeSlice,
    [posts.reducerPath]: posts.reducer,
  },
  middleware: mid => mid().concat(posts.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
