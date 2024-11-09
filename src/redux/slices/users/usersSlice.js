import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrAction } from "../globalActions/globalActions";
import { useSelector } from "react-redux";

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
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
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
      //Save the uer into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (
    { fullname, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/register`, {
        fullname,
        email,
        password,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Update user shipping address action
export const updateUserShippingAddressAction = createAsyncThunk(
  "users/update-shipping-address",
  async (
    { firstName, lastName, address, city, country, region, postalCode, phone },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //Get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/users/update/shipping`,
        {
          firstName,
          lastName,
          address,
          city,
          country,
          region,
          postalCode,
          phone,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//Get user profile action
export const getUserProfileAction = createAsyncThunk(
  "users/get-user-profile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //Get token
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //handle actions
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //update shipping address
    builder.addCase(
      updateUserShippingAddressAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      updateUserShippingAddressAction.fulfilled,
      (state, action) => {
        state.user = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      updateUserShippingAddressAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }
    );
    //get user profile
    builder.addCase(
      getUserProfileAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getUserProfileAction.fulfilled,
      (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      getUserProfileAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }
    );
    //reset error action
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });
  },
});

//generate reducer

const usersReducer = usersSlice.reducer;

export default usersReducer;
