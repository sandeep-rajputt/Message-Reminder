import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async () => {
    const response = await axios.get("/api/userData", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data.userData;
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
