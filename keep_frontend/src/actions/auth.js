import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
  CLEAR_PROFILE,
} from "../types";
import axios from "axios";
import setAuthToken from "../setAuthToken";

// Load user

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:3333/api/user");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      dispatch({
        type: AUTH_ERROR,
        payload: errors.data.errors[0].msg,
      });
    }
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  console.log(name, email, password);
  try {
    const res = await axios.post("/api/user", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response;
    if (errors) {
      dispatch({
        type: REGISTER_FAIL,
        payload: errors.data.errors[0].msg,
      });
    }
  }
};

// Login user
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/user/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      dispatch({
        type: LOGIN_FAIL,
        payload: errors.data.error,
      });
    }
  }
};

// Logout / clear

export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
