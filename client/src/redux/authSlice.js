import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subcontractorAuthService } from "../services/subcontractorAuthService";
import { ownerAuthService } from "../services/ownerAuthService";

const initialState = {
  authToken: null,
  isLoading: false,
  isSuccess: false,
  isLogoutSuccess: false,
  isError: false,
  role: "",
  message: "",
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      return await subcontractorAuthService.forgotPassword(email);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// authRegister User
export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (userData, thunkAPI) => {
    try {
      return await subcontractorAuthService.login(userData);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// authRegister User
export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (userData, thunkAPI) => {
    try {
      return await (userData.identifier === "sub"
        ? subcontractorAuthService.createAccountGmail(userData)
        : ownerAuthService.createAccountGmail(userData));
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update profile
export const profileUpdate = createAsyncThunk(
  "auth/profileUpdate",
  async (userData, thunkAPI) => {
    try {
      return await (userData.identifier === "sub"
        ? subcontractorAuthService.updateProfile(userData)
        : ownerAuthService.updateProfile(userData));
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (thunkAPI) => {
    try {
      return await subcontractorAuthService.logout();
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLogoutSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authRegister.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(authRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.authToken = action.payload.token;
    });

    builder.addCase(authRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.authToken = null;
    });
    builder.addCase(authLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.role = action.payload.role;
      state.authToken = action.payload.token;
    });

    builder.addCase(authLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.authToken = null;
      state.role = "";
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });

    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(profileUpdate.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(profileUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });

    builder.addCase(profileUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authToken = null;
      state.isLogoutSuccess = true;
      state.message = action.payload;
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isLogoutSuccess = false;
      state.message = action.payload;
    });
  },
});

export const { authReset } = authSlice.actions;
export default authSlice.reducer;
