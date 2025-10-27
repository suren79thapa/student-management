// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "../api/studentApi.js";

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});
