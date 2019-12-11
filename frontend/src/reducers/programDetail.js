import { GET_PROGRAM, GET_PROGRAM_DETAIL } from "../actions/types.js";

const initialState = {
  program: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROGRAM:
      return {
        ...state, // gets all properties of initialState.
        program: action.payload
      };
    case GET_PROGRAM_DETAIL:
      return {
        ...state, // gets all properties of initialState.
        programDetail: action.payload
      };
    // case DELETE_PROGRAM:
    //   return {
    //     ...state, // gets all properties of initialState.
    //     programs: state.programs.filter(
    //       program => program.id !== action.payload
    //     )
    //   };
    // case ADD_PROGRAM:
    //   return {
    //     ...state, // gets all properties of initialState.
    //     programs: [...state.programs, action.payload] // [existing programs, append new payload program]
    //   };
    default:
      return state;
  }
}
