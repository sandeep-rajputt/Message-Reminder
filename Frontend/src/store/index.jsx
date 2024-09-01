import { configureStore } from "@reduxjs/toolkit";
import UserDataSlices from "./slices/UserDataSlices";

export const store = configureStore({
  reducer: {
    userData: UserDataSlices,
  },
});
