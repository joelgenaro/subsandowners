import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobPostingsService } from "../services/jobPostingsService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: null,
  paginator: null,
  message: "",
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

// Get all Jobs
export const getData = createAsyncThunk(
  "jobPostings/getData",
  async (data, thunkAPI) => {
    try {
      return await jobPostingsService.getData(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search job with text
export const filter = createAsyncThunk(
  "jobPostings/filter",
  async (data, thunkAPI) => {
    try {
      return await jobPostingsService.filter(data);
    } catch (error) {
      const message = errorMessageHandler(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const jobPostingsSlice = createSlice({
  name: "jobPostings",
  initialState,
  reducers: {
    jobPostingsReset: (state) => {
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
      state.data = action.payload.itemsList;
      state.paginator = action.payload.paginator;
    });

    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.data = null;
      state.paginator = null;
    });

    builder.addCase(filter.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(filter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload.itemsList;
      state.paginator = action.payload.paginator;
    });

    builder.addCase(filter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.data = null;
      state.paginator = null;
    });
  },
});

export const { jobPostingsReset } = jobPostingsSlice.actions;
export default jobPostingsSlice.reducer;
