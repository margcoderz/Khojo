import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const posts = createApi({
  reducerPath: 'postapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: builder => ({
    getPosts: builder.query<string, any>({query: () => 'posts'}),
  }),
});

export const {useGetPostsQuery} = posts;
