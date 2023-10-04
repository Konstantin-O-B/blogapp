import { createSlice } from '@reduxjs/toolkit';

import { getItemFromLS, setItemToLS } from '../services/serviceLS';

export interface User {
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

  const user = getItemFromLS('user');
  const parsedUser = user ? JSON.parse(user) : null;

const initialState: User = {
  user: {
    email: parsedUser?.user.email,
    username: parsedUser?.user.username,
    bio: parsedUser?.user.bio,
    image: parsedUser?.user.image,
    password: parsedUser?.user.password,
    token: parsedUser?.user.token,
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
