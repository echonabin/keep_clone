/* eslint-disable import/no-anonymous-default-export */
import {
  GET_NOTES,
  NOTE_ERROR,
  DELETE_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
  LOGOUT,
} from "../types";

const initialState = {
  notes: [],
  note: null,
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOTES:
      return { ...state, notes: payload };
    case ADD_NOTE:
      return { ...state, notes: [payload, ...state.notes] };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== payload),
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: payload,
      };
    case NOTE_ERROR:
      return { ...state, error: payload };
    case LOGOUT:
      return { ...state, notes: [], note: null, error: {} };
    default:
      return state;
  }
};
