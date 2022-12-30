import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobListService } from "../services/jobListService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: null,
  paginator: null,
  size: 5,
  message: "",
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

// Get all Jobs
export const getData = createAsyncThunk(
  "jobList/getData",
  async (data, thunkAPI) => {
    try {
      return await jobListService.getData(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const jobListSlice = createSlice({
  name: "jobList",
  initialState,
  reducers: {
    jobListReset: (state) => {
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
  },
});

export const { jobListReset, setSize, setFilterOptions } = jobListSlice.actions;
export default jobListSlice.reducer;
