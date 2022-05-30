import { createSlice } from "@reduxjs/toolkit";

const initial = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  userID: localStorage.getItem("userID"),
  // token: "",
  // role: "",
  // userID: "",
  URL: "http://localhost:5000/api/v1/",
};

localStorage.removeItem("email");

const authStore = createSlice({
  name: "loging",
  initialState: initial,
  reducers: {
    login(state, action) {
      state.role = action.payload.role;
      state.userID = action.payload.id;
      state.token = action.payload.token;

      localStorage.setItem("token", state.token);
      localStorage.setItem("role", state.role);
      localStorage.setItem("userID", state.userID);
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userID");
    },
  },
});

export default authStore;

export const { login, logout } = authStore.actions;
