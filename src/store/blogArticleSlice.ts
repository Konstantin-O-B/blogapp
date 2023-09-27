import { createSlice } from '@reduxjs/toolkit';
/* import { QueryClient } from '@tanstack/react-query'; */

/* import { getItemFromLS } from '../services/serviceLS';
import { getResources } from '../services/servicesAPI/serviceAPI'; */

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
  error: boolean;
  favorited: boolean;
}

const initialState: BlogArticleSlice = {
  articles: [],
  loader: true,
  articlesCount: 0,
  currentPage: 0,
  limitArticles: 5,
  offset: 0,
  error: false,
  favorited: false,
};

/* const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
}); */

/* export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async (payload: { offset: number; BASE_URL: string; limitArticles: number; favorited: boolean }) => {
    const { offset, BASE_URL, limitArticles, favorited } = payload;
    const articlesPack = await queryClient.fetchQuery(['ticketsPack', offset, favorited], () => {
      const newURL = new URL(`${BASE_URL}/articles`);
      if (offset !== 0) {
        newURL.searchParams.append('offset', offset.toString());
      }
      newURL.searchParams.append('limit', limitArticles.toString());
      console.log(5);
      return getResources(newURL.toString(), getItemFromLS('tokenAPI')?.toString());
    });
    console.log(6);
    console.log(favorited);
    return articlesPack;
  }
); */

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
  /* extraReducers: {
    [getArticles.pending.type]: (state) => {
      state.loader = true;
      state.error = false;
    },
    [getArticles.fulfilled.type]: (state, { payload }) => {
      state.loader = false;
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
    },
    [getArticles.rejected.type]: (state) => {
      state.error = true;
    },
  }, */
});
export default blogArticleSlice.reducer;
export const { addArticles, toggleLoader, setCurrentPage, setOffset, toggleFavorited } = blogArticleSlice.actions;
