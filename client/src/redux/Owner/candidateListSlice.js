import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { candidateListService } from "../../services/Owner/candidateListService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  fav_subs: [],
  data: null,
  paginator: null,
  size: 5,
  message: "",
};

const checkFavJobs = (data, fav_subs) => {
  if (fav_subs.length > 0) {
    const oldData = data;

    fav_subs.forEach((id) => {
      oldData.map((user) => {
        if (id === user["_id"]) {
          user.is_fav = true;
        }
      });
    });
    return oldData;
  }
  return data;
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

export const updateFavOfDB = createAsyncThunk(
  "candidateList/updateFavOfDB",
  async (data, thunkAPI) => {
    try {
      return await candidateListService.updateFavOfDB(data);
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
    updateFav: (state, action) => {
      let data = state.data;
      data.map((user) => {
        if (action.payload["_id"] === user["_id"]) {
          user.is_fav = !action.payload.is_fav;
        }
      });
      state.data = data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = checkFavJobs(
        action.payload.itemsList,
        action.payload.fav_subs
      );
      state.paginator = action.payload.paginator;
      state.fav_subs = action.payload.fav_subs;
    });

    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.data = null;
      state.paginator = null;
      state.fav_subs = [];
    });

    builder.addCase(filter.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(filter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = checkFavJobs(
        action.payload.itemsList,
        action.payload.fav_subs
      );
      state.paginator = action.payload.paginator;
      state.fav_subs = action.payload.fav_subs;
    });

    builder.addCase(filter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.data = null;
      state.paginator = null;
      state.fav_subs = [];
    });

    builder.addCase(updateFavOfDB.fulfilled, (state, action) => {
      state.isSuccess = true;
    });
    builder.addCase(updateFavOfDB.rejected, (state, action) => {
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { candidateListReset, setSize, updateFav } =
  candidateListSlice.actions;
export default candidateListSlice.reducer;
