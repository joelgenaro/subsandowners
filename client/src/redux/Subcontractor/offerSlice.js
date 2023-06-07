import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { offerService } from "../../services/Subcontractor/offerService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  applicationId: null,
  client: null,
  job: null,
  ownerInfo: null,
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const getData = createAsyncThunk(
  "offer/getData",
  async (data, thunkAPI) => {
    try {
      return await offerService.getData(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const declineOffer = createAsyncThunk(
  "offer/declineOffer",
  async (data, thunkAPI) => {
    try {
      return await offerService.declineOffer(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const acceptOffer = createAsyncThunk(
  "offer/acceptOffer",
  async (data, thunkAPI) => {
    try {
      return await offerService.acceptOffer(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    offerReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setApplicationId: (state, action) => {
      state.applicationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.job = action.payload.jobInfo;
      state.ownerInfo = action.payload.ownerInfo;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.job = null;
      state.ownerInfo = null;
    });

    builder.addCase(declineOffer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(declineOffer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(declineOffer.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(acceptOffer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(acceptOffer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(acceptOffer.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { offerReset, setApplicationId } = offerSlice.actions;
export default offerSlice.reducer;
