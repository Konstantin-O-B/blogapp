import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

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
  errors: Error | AxiosError | null | SerializedError | IErrors;
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
      console.log(state, payload);
      state.errors = payload;
      console.log(payload);
      
    },
  },
});
export default blogAppSlice.reducer;
export const { toggleadd, setError } = blogAppSlice.actions;
