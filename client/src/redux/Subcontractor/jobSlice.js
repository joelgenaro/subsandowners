import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobService } from "../../services/Subcontractor/jobService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  details: null,
  data: null,
  paginator: null,
  fav_jobs: [],
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

const checkFavJobs = (data, fav_jobs) => {
  if (fav_jobs.length > 0) {
    const oldData = data;

    fav_jobs.forEach((id) => {
      oldData.map((job) => {
        if (id === job["_id"]) {
          job.is_fav = true;
        }
      });
    });
    return oldData;
  }
  return data;
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

export const updateFavOfDB = createAsyncThunk(
  "job/updateFavOfDB",
  async (data, thunkAPI) => {
    try {
      return await jobService.updateFavOfDB(data);
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
    updateFav: (state, action) => {
      let data = state.data;
      data.map((job) => {
        if (action.payload["_id"] === job["_id"]) {
          job.is_fav = !action.payload.is_fav;
        }
      });
      state.data = data;
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

    builder.addCase(updateFavOfDB.fulfilled, (state, action) => {
      state.isSuccess = true;
    });
    builder.addCase(updateFavOfDB.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getAllJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = checkFavJobs(
        action.payload.itemsList,
        action.payload.fav_jobs
      );
      state.paginator = action.payload.paginator;
      state.fav_jobs = action.payload.fav_jobs;
    });
    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.data = null;
      state.paginator = null;
      state.fav_jobs = [];
    });
  },
});

export const { jobReset, setSize, updateFav, setFilterOptions } =
  jobSlice.actions;
export default jobSlice.reducer;
