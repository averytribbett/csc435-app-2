import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    signup: (state, action) => {
      //@TODO once mongo is linked up implement
    },
    updateUser: (state, action) => {
      // @TODO once mongo is linked up implement
    },
    logout: (state) => {
      state.user = null;
    }
  },
});

export const { login, signup, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;