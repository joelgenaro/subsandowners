import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobService } from "../../services/Subcontractor/jobService";
import { applicantsService } from "../../services/Owner/applicantsService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  jobId: null,
  jobDetails: null,
  isEditJob: false,
  reviewProposals: {
    data: null,
    paginator: null,
  },
  hiredCandidates: {
    data: null,
    paginator: null,
  },
  invite: {
    data: null,
    paginator: null,
  },
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

export const getProposals = createAsyncThunk(
  "applicants/getProposals",
  async (jobId, thunkAPI) => {
    try {
      return await applicantsService.getProposals(jobId);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getHiredCandidates = createAsyncThunk(
  "applicants/getHiredCandidates",
  async (jobId, thunkAPI) => {
    try {
      return await applicantsService.getHiredCandidates(jobId);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const endContract = createAsyncThunk(
  "applicants/endContract",
  async (data, thunkAPI) => {
    try {
      return await applicantsService.endContract(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateJob = createAsyncThunk(
  "applicants/updateJob",
  async (jobId, thunkAPI) => {
    try {
      return await applicantsService.updateJob(jobId);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendOffer = createAsyncThunk(
  "applicants/sendOffer",
  async (data, thunkAPI) => {
    try {
      return await applicantsService.sendOffer(data);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getJobDetails = createAsyncThunk(
  "applicants/getJobDetails",
  async (jobId, thunkAPI) => {
    try {
      return await jobService.getJobDetails(jobId);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const applicants = createSlice({
  name: "applicants",
  initialState,
  reducers: {
    applicantsReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setJobId: (state, action) => {
      state.jobId = action.payload;
    },
    setJobEdit: (state, action) => {
      state.isEditJob = action.payload;
    },
    setJobDetails: (state, action) => {
      state.jobDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProposals.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProposals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.reviewProposals.data = action.payload.itemsList;
      state.reviewProposals.paginator = action.payload.paginator;
    });
    builder.addCase(getProposals.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.reviewProposals.data = null;
      state.reviewProposals.paginator = null;
    });

    builder.addCase(getHiredCandidates.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHiredCandidates.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.hiredCandidates.data = action.payload.itemsList;
      state.hiredCandidates.paginator = action.payload.paginator;
    });
    builder.addCase(getHiredCandidates.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.hiredCandidates.data = null;
      state.hiredCandidates.paginator = null;
    });

    builder.addCase(endContract.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(endContract.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;

      state.hiredCandidates.data.map((user) => {
        if (action.payload.id === user["_id"]) {
          user.subFeedback.stars.$numberDecimal =
            action.payload.setParams.$set["subFeedback.stars"];
          user.subFeedback.feedback =
            action.payload.setParams.$set["subFeedback.feedback"];
        }
      });
    });
    builder.addCase(endContract.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(updateJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(updateJob.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(sendOffer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendOffer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;

      state.reviewProposals.data.map((item) => {
        if (item.candidateId == action.payload.candidateId) {
          item.status = "sendOffer";
        }
      });
    });
    builder.addCase(sendOffer.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(getJobDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.jobDetails = action.payload.details;
    });
    builder.addCase(getJobDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.jobDetails = null;
    });
  },
});

export const { applicantsReset, setJobId, setJobEdit, setJobDetails } =
  applicants.actions;
export default applicants.reducer;
