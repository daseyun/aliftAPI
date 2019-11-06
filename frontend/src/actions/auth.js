import axios from "axios";
import { returnErrors } from "./messages";

import { USER_LOADED, USER_LOADING, AUTH_ERROR } from "./types";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // Get token from state
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // if token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("/api/auth/user", config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      // if no token that matches, catch error
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({ type: AUTH_ERROR });
    });
};
