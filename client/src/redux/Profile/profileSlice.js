import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileService } from "../../services/Profile/profileService";
import { authService } from "../../services/Extra/authService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (data, thunkAPI) => {
    try {
      return await profileService.getProfile(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update profile
export const profileUpdate = createAsyncThunk(
  "profile/profileUpdate",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateProfile(userData);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload.profile;
    });

    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.data = null;
    });

    builder.addCase(profileUpdate.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(profileUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.data = action.payload.updatedProfile;
      localStorage.setItem("user", JSON.stringify(action.payload.current_user));
    });

    builder.addCase(profileUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.data = null;
    });
  },
});

export const { profileReset } = profileSlice.actions;
export default profileSlice.reducer;
