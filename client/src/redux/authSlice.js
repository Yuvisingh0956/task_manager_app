import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await axios.post("/api/auth/login", data);
  return res.data.token;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const res = await axios.post("/api/auth/register", data);
  return res.data.token;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { token: token || null, status: "idle", error: null },
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
