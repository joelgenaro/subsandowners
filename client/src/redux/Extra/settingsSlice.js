import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { settingsService } from "../../services/Extra/settingsService";

const initialState = {
  email: null,
  password: null,
  serviceArea: null,
  membership: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const getData = createAsyncThunk(
  "settings/getData",
  async (data, thunkAPI) => {
    try {
      return await settingsService.getData(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateEmail = createAsyncThunk(
  "settings/updateEmail",
  async (data, thunkAPI) => {
    try {
      return await settingsService.updateEmail(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    settingsReset: (state) => {
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
      state.email = action.payload.email;
    });

    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(updateEmail.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.email = action.payload.email;
    });

    builder.addCase(updateEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { settingsReset } = settingsSlice.actions;
export default settingsSlice.reducer;
