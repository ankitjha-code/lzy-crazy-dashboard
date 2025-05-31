import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = action.payload.success;
      localStorage.setItem('isAuthenticated', action.payload.success);
      state.user = action.payload.data;
      localStorage.setItem('user', JSON.stringify(action.payload.data));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
