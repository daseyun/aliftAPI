import { CREATE_MESSAGE } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload); // --> change state and send it down
    default:
      return state;
  }
}
