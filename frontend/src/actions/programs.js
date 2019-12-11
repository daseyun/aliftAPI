// any actions to fire off go here.
// HTTP requests.

// axios for async requests
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_PROGRAMS, DELETE_PROGRAM, ADD_PROGRAM } from "./types";

// GET PROGRAMS

// dispatch whenever we wanna dispatch an action to our reducer (ex. GET_PROGRAMS)
// dispatched to reducer. (/reducers/programs.js)
export const getPrograms = () => (dispatch, getState) => {
  axios
    .get("/api/programs/", tokenConfig(getState)) // pass in: tokenConfig(getState) for any protected route.
    .then(res => {
      dispatch({
        type: GET_PROGRAMS,
        payload: res.data //reducer is expecting a type. in /reducers/programs.js
      });
    })

    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE PROGRAM
export const deleteProgram = id => (dispatch, getState) => {
  axios
    .delete(`/api/programs/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteProgram: "Program Deleted" }));
      dispatch({
        type: DELETE_PROGRAM,
        payload: id //reucer is expecting a type. in /reducers/programs.js
      });
    })
    .catch(err => console.log(err));
};

// ADD PROGRAM
export const addProgram = program => (dispatch, getState) => {
  console.log(tokenConfig(getState));
  axios
    .post(`/api/programs/`, program, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addProgram: "Program Added" }));
      dispatch({
        type: ADD_PROGRAM,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
