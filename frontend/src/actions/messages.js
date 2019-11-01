import { CREATE_MESSAGE } from "./types";

// CREATE MESSAGE
export const createMessage = msg => {
  return {
    // no async methods with axios so no dispatch.
    type: CREATE_MESSAGE,
    payload: msg
  };
};
