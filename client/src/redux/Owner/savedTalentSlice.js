import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { candidateListService } from "../../services/Owner/candidateListService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
  paginator: null,
  size: 5,
  isRemoveFav: false,
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const getData = createAsyncThunk(
  "savedTalent/getData",
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
  "savedTalent/filter",
  async (data, thunkAPI) => {
    try {
      return await candidateListService.filter(data);
    } catch (error) {
      const message = errorMessageHandler(error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const removeFav = createAsyncThunk(
  "savedTalent/removeFav",
  async (data, thunkAPI) => {
    try {
      return await candidateListService.removeFav(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const savedTalentSlice = createSlice({
  name: "savedTalent",
  initialState,
  reducers: {
    savedTalentReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setIsRemoveFav: (state, action) => {
      state.isRemoveFav = false;
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

    builder.addCase(removeFav.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFav.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isRemoveFav = true;
    });
    builder.addCase(removeFav.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isRemoveFav = false;
      state.message = action.payload;
    });
  },
});

export const { savedTalentReset, setSize, setIsRemoveFav } =
  savedTalentSlice.actions;
export default savedTalentSlice.reducer;
