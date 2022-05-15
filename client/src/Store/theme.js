import { createSlice } from "@reduxjs/toolkit";

if (!localStorage.getItem("mode")) {
  localStorage.setItem("mode", "light");
}
const initial = {
  mode: localStorage.getItem("mode"),
};

const themeStore = createSlice({
  name: "mode",
  initialState: initial,
  reducers: {
    dark(state) {
      state.mode = "dark";
      localStorage.setItem("mode", "dark");
    },
    light(state) {
      state.mode = "light";
      localStorage.setItem("mode", "light");
    },
  },
});

export default themeStore;

export const { dark, light } = themeStore.actions;
