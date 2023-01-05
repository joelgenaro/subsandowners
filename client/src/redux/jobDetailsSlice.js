import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { projectService } from "../services/projectService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  details: null,
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const getData = createAsyncThunk(
  "jobDetails/getData",
  async (jobId, thunkAPI) => {
    try {
      return await projectService.getJobDetails(jobId);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const jobDetailsSlice = createSlice({
  name: "jobDetails",
  initialState,
  reducers: {
    jobDetailsReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.details = action.payload.details;
    });

    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.details = null;
    });
  },
});

export const { jobDetailsReset } = jobDetailsSlice.actions;
export default jobDetailsSlice.reducer;
