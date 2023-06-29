import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { myJobsService } from "../../services/Owner/myJobsService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  contracts: [],
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const getData = createAsyncThunk(
  "myJobs/getData",
  async (data, thunkAPI) => {
    try {
      return await myJobsService.getData(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const filter = createAsyncThunk(
  "myJobs/filter",
  async (data, thunkAPI) => {
    try {
      return await myJobsService.filter(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const myJobsSlice = createSlice({
  name: "myJobs",
  initialState,
  reducers: {
    myJobsReset: (state) => {
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
      state.contracts = action.payload.contracts;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.contracts = [];
    });

    builder.addCase(filter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(filter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.contracts = action.payload.contracts;
    });
    builder.addCase(filter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.contracts = [];
    });
  },
});

export const { myJobsReset } = myJobsSlice.actions;
export default myJobsSlice.reducer;
