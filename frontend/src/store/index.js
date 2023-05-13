import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false,user:{} },
  reducers: {
    login(state,action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});

const adminSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false,admin:{} },
  reducers: {
    login(state,action) {
      state.isLoggedIn = true;
      state.admin = action.payload.admin;
    },
    logout(state) {
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});