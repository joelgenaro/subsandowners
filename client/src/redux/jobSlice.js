import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobService } from "../services/jobService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  details: null,
  data: null,
  paginator: null,
  size: 5,
  filterOptions: {
    text: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    category: [],
    isRemoval: "removalAll",
  },
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const createJob = createAsyncThunk(
  "job/create",
  async (data, thunkAPI) => {
    try {
      return await jobService.createJob(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getJobDetails = createAsyncThunk(
  "job/getJobDetails",
  async (jobId, thunkAPI) => {
    try {
      return await jobService.getJobDetails(jobId);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllJobs = createAsyncThunk(
  "job/getAllJobs",
  async (data, thunkAPI) => {
    try {
      return await jobService.getAllJobs(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const placeBid = createAsyncThunk(
  "job/placeBid",
  async (data, thunkAPI) => {
    try {
      return await jobService.placeBid(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    jobReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createJob.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getJobDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.details = action.payload.details;
    });
    builder.addCase(getJobDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.details = null;
    });

    builder.addCase(getAllJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload.itemsList;
      state.paginator = action.payload.paginator;
    });
    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.data = null;
      state.paginator = null;
    });
  },
});

export const { jobReset, setSize, setFilterOptions } = jobSlice.actions;
export default jobSlice.reducer;
