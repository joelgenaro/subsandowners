import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { proposalService } from "../services/proposalService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  jobId: null,
  proposal: null,
  isEdit: false,
  proposals: null,
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const placeBid = createAsyncThunk(
  "proposal/placeBid",
  async (data, thunkAPI) => {
    try {
      return await proposalService.placeBid(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const myProposal = createAsyncThunk(
  "proposal/myProposal",
  async (data, thunkAPI) => {
    try {
      return await proposalService.myProposal(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProposal = createAsyncThunk(
  "proposal/getProposal",
  async (data, thunkAPI) => {
    try {
      return await proposalService.getProposal(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const retract = createAsyncThunk(
  "proposal/retract",
  async (data, thunkAPI) => {
    try {
      return await proposalService.retract(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    proposalReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setJobId: (state, action) => {
      state.jobId = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setProposal: (state, action) => {
      state.proposal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(placeBid.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(placeBid.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.proposal = action.payload.proposal;
    });
    builder.addCase(placeBid.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.proposal = null;
    });

    builder.addCase(retract.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(retract.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.proposal = null;
    });
    builder.addCase(retract.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getProposal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProposal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.proposal = action.payload.isExistProposal;
    });
    builder.addCase(getProposal.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.proposal = null;
    });

    builder.addCase(myProposal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(myProposal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.proposals = action.payload.proposals;
    });
    builder.addCase(myProposal.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.proposals = null;
    });
  },
});

export const { proposalReset, setJobId, setIsEdit, setProposal } =
  proposalSlice.actions;
export default proposalSlice.reducer;
