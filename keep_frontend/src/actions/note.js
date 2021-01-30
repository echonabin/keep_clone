import axios from "axios";
import {
  GET_NOTES,
  NOTE_ERROR,
  DELETE_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
} from "../types";

// Get Notes
export const getNotes = (token) => async (dispatch) => {
  const config = {
    headers: {
      "x-auth-token": token,
    },
  };
  try {
    const res = await axios.get("/api/notes", config);
    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });
  } catch (err) {
    const error = err.message;
    if (error) {
      dispatch({
        type: NOTE_ERROR,
        payload: error,
      });
    }
  }
};

// Delete Note
export const deleteNote = (id, token) => async (dispatch) => {
  const config = {
    headers: {
      "x-auth-token": token,
    },
  };
  try {
    await axios.delete(`/api/notes/${id}`, config);
    dispatch({
      type: DELETE_NOTE,
      payload: id,
    });
  } catch (err) {
    const error = err.message;
    if (error) {
      dispatch({
        type: NOTE_ERROR,
        payload: error,
      });
    }
  }
};

// Add note
export const addNote = ({ title, description }, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ title, description });
  try {
    const res = await axios.post("/api/notes", body, config);
    dispatch({
      type: ADD_NOTE,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response;
    console.log(error);
    if (error) {
      dispatch({
        type: NOTE_ERROR,
        payload: error,
      });
    }
  }
};

// Update Notes
export const updateNote = ({ title, description }, id, token) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ title, description });
  try {
    const res = await axios.put(`/api/notes/${id}`, body, config);
    dispatch({
      type: UPDATE_NOTE,
      payload: res.data,
    });
  } catch (err) {
    const error = err.message;
    if (error) {
      dispatch({
        type: NOTE_ERROR,
        payload: error,
      });
    }
  }
};
