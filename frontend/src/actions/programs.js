// any actions to fire off go here.
// HTTP requests.

// axios for async requests
import axios from "axios";
import { createMessage } from "./messages";

import { GET_PROGRAMS, DELETE_PROGRAM, ADD_PROGRAM, GET_ERRORS } from "./types";

// GET PROGRAMS

// dispatch whenever we wanna dispatch an action to our reducer (ex. GET_PROGRAMS)
// dispatched to reducer. (/reducers/programs.js)
export const getPrograms = () => dispatch => {
  axios
    .get("/programs")
    .then(res => {
      dispatch({
        type: GET_PROGRAMS,
        payload: res.data //reucer is expecting a type. in /reducers/programs.js
      });
    })
    .catch(err => console.log(err));
};

// DELETE PROGRAM
export const deleteProgram = id => dispatch => {
  axios
    .delete(`/programs/${id}/`)
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
export const addProgram = program => dispatch => {
  axios
    .post(`/programs/`, program)
    .then(res => {
      dispatch(createMessage({ addProgram: "Program Added" }));
      dispatch({
        type: ADD_PROGRAM,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors // dispatches state to redux state.
      });
    });
};
