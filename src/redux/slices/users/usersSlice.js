import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//InitialState
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    uerInfo: {},
  },
};
//Login action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);
//users slice
const usersSlice = createSlice({
    name:"users",
    initialState,
    extraReducers: (builder) => {
        //handle actions
        //login
        builder.addCase()
    }
})