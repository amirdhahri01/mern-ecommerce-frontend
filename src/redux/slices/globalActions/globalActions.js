const { createAsyncThunk } = require("@reduxjs/toolkit");

//reset error action

export const resetErrAction = createAsyncThunk("resetErr-Action", async () => {
  return {};
});

//reset success action

export const resetSuccessAction = createAsyncThunk(
  "resetSuccess-Action",
  async () => {
    return {};
  }
);
