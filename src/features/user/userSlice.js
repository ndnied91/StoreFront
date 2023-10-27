import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
  winter: 'winter',
  night: 'night',
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.winter;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const getUserfromLocalStorage = () => {
  if (localStorage.getItem('user') !== null) {
    const parsedUser = JSON.parse(localStorage.getItem('user'));

    const user = {
      username: parsedUser.username,
      email: parsedUser.email,
      token: parsedUser.token,
    };
    return user;
  } else {
    return { username: '' };
  }
};

const defaultState = {
  user: getUserfromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload);
      const user = { ...action.payload.user, token: action.payload.jwt };
      console.log(user);
      state.user = user;

      localStorage.setItem('user', JSON.stringify(user));

      return state;
    },
    logoutUser: (state) => {
      state.user = { username: null };
      localStorage.removeItem('user');
      toast.success('Successfully logged out!');
      return state;
    },
    toggleTheme: (state) => {
      const { night, winter } = themes;
      state.theme = state.theme === night ? winter : night;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
