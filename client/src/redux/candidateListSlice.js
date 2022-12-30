import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { candidateListService } from "../services/candidateListService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: null,
  paginator: null,
  size: 5,
  message: "",
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

// Get all Jobs
export const getData = createAsyncThunk(
  "candidateList/getData",
  async (data, thunkAPI) => {
    try {
      return await candidateListService.getData(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search job with text
export const filter = createAsyncThunk(
  "candidateList/filter",
  async (data, thunkAPI) => {
    try {
      return await candidateListService.filter(data);
    } catch (error) {
      const message = errorMessageHandler(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const candidateListSlice = createSlice({
  name: "candidateList",
  initialState,
  reducers: {
    candidateListReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setSize: (state, action) => {
      state.size = action.payload;
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

export const { candidateListReset, setSize } = candidateListSlice.actions;
export default candidateListSlice.reducer;
