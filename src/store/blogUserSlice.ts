import { createSlice } from '@reduxjs/toolkit';

import { setItemToLS } from '../services/serviceLS';

interface User {
  user: {
    email?: string;
    username?: string;
    bio?: string;
    image?: string | null;
    password?: string;
    token?: string | undefined;
  };
  isAuth: boolean;
}

const initialState: User = {
  user: {
    email: '',
    username: '',
    bio: '',
    image: null,
    password: '',
    token: '',
  },
  isAuth: false,
};

const blogUserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = { ...state.user, ...action.payload.user };
      state.isAuth = true;
      setItemToLS('isAuth', 'true');
      setItemToLS('tokenAPI', `${state.user.token}`);
    },
    exitUser(state) {
      state.user = { ...initialState.user };
      state.isAuth = false;
      localStorage.clear();
    },
  },
});
export default blogUserSlice.reducer;
export const { setUser, exitUser } = blogUserSlice.actions;
