import { configureStore } from "@reduxjs/toolkit";

import authStore from "./auth";
import themeStore from "./theme";

const store = configureStore({
  reducer: {
    loging: authStore.reducer,
    mode: themeStore.reducer,
  },
});

export default store;
