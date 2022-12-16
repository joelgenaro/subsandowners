import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectService } from "../services/projectService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

// Update profile
export const createProject = createAsyncThunk(
  "project/create",
  async (data, thunkAPI) => {
    try {
      return await projectService.createProject(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });

    builder.addCase(createProject.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { projectReset } = projectSlice.actions;
export default projectSlice.reducer;
