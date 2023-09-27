import { createSlice } from '@reduxjs/toolkit';

interface Button {
  id: number;
  text: string;
  active: boolean;
  link: string;
}

export interface IError {
  key: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response?: { data?: any; status?: number };
}

export interface IErrors {
  status: string | number | undefined;
  errors?: IError[] | null;
}

interface BlogAppSlice {
  buttons: Button[];
  errors: IErrors | null | undefined;
}

const initialState: BlogAppSlice = {
  buttons: [
    { id: 1, text: 'Войти', active: false, link: 'sign-in' },
    { id: 2, text: 'Зарегистрироваться', active: false, link: 'sign-up' },
  ],
  errors: null,
};

const blogAppSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    toggleadd(state, action) {
      state.buttons = action.payload;
    },
    setError(state, { payload }) {
      state.errors = payload;
    },
  },
});
export default blogAppSlice.reducer;
export const { toggleadd, setError } = blogAppSlice.actions;
