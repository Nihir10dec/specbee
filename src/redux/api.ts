import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface News {
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummy-rest-api.specbee.site/',
  }),
  endpoints: (b) => ({
    getNews: b.query<News[], void>({
      query: () => ({
        url: `api/v1/news`,
      }),
    }),
  }),
});

export type ApiSlice = typeof api;
export const { useGetNewsQuery } = api;