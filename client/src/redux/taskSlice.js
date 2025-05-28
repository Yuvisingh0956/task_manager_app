import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.get("/api/tasks", getAuthHeader(token));
    return res.data;
  }
);

export const addTask = createAsyncThunk(
  "tasks/add",
  async (data, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.post("/api/tasks", data, getAuthHeader(token));
    return res.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.put(`/api/tasks/${id}`, data, getAuthHeader(token));
    return res.data;
  }
);

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleStatus",
  async (id, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.patch(
      `/api/tasks/${id}/status`,
      {},
      getAuthHeader(token)
    );
    return res.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { getState }) => {
    const token = getState().auth.token;
    await axios.delete(`/api/tasks/${id}`, getAuthHeader(token));
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t._id === action.payload._id);
        if (idx > -1) state.items[idx] = action.payload;
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t._id === action.payload._id);
        if (idx > -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
