import { createSlice, SerializedError } from '@reduxjs/toolkit';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    image: string;
    following: boolean;
  };
}

interface BlogArticleSlice {
  articles: Article[];
  loader: boolean;
  articlesCount: number;
  currentPage: number;
  limitArticles: number;
  offset: number;
  error: SerializedError | null | string | object;
  favorited: boolean;
  status: string;
}

const initialState: BlogArticleSlice = {
  articles: [],
  loader: true,
  articlesCount: 0,
  currentPage: 1,
  limitArticles: 5,
  offset: 0,
  error: null,
  favorited: false,
  status: 'pending'
};

const blogArticleSlice = createSlice({
  name: 'Article',
  initialState,
  reducers: {
    addArticles(state, { payload }) {
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
    },
    toggleLoader(state, { payload }) {
      state.loader = payload;
    },
    setCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    setOffset(state, { payload }) {
      state.offset = payload;
    },
    toggleFavorited(state) {
      state.favorited = !state.favorited;
    },
  },
});
export default blogArticleSlice.reducer;
export const { addArticles, toggleLoader, setCurrentPage, setOffset, toggleFavorited } = blogArticleSlice.actions;
