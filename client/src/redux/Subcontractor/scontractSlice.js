import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scontractService } from "../../services/Subcontractor/scontractService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  data: null,
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const getData = createAsyncThunk(
  "scontract/getData",
  async (data, thunkAPI) => {
    try {
      return await scontractService.getData(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const giveFeedback = createAsyncThunk(
  "applicants/giveFeedback",
  async (data, thunkAPI) => {
    try {
      return await scontractService.giveFeedback(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const scontractSlice = createSlice({
  name: "scontract",
  initialState,
  reducers: {
    scontractReset: (state) => {
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
      state.data = action.payload.contractDetails;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.data = null;
    });

    builder.addCase(giveFeedback.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(giveFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data.ownerFeedback.stars.$numberDecimal =
        action.payload.setParams.$set["ownerFeedback.stars"];
      state.data.ownerFeedback.feedback =
        action.payload.setParams.$set["ownerFeedback.feedback"];
    });
    builder.addCase(giveFeedback.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { scontractReset } = scontractSlice.actions;
export default scontractSlice.reducer;
