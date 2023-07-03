import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { savedJobService } from "../../services/Subcontractor/savedJobService";
import { candidateListService } from "../../services/Owner/candidateListService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isRemoveFav: false,
  message: "",
  data: [],
  paginator: null,
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

export const getData = createAsyncThunk(
  "savedJob/getData",
  async (data, thunkAPI) => {
    try {
      return await savedJobService.getData(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeFav = createAsyncThunk(
  "savedJob/removeFav",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await savedJobService.removeFav(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const savedJobSlice = createSlice({
  name: "savedJob",
  initialState,
  reducers: {
    savedJobReset: (state) => {
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
      state.data = [];
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

export const { savedJobReset, setSize, setFilterOptions, setIsRemoveFav } =
  savedJobSlice.actions;
export default savedJobSlice.reducer;
