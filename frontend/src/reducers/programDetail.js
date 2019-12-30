import {
  GET_PROGRAM,
  GET_PROGRAM_DETAIL,
  UPDATE_PROGRAM_DETAIL,
  DELETE_EXERCISE_SET_DETAIL
} from "../actions/types.js";
import { bindActionCreators } from "redux";

const initialState = {
  program: null,
  programDetail: null
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
    case UPDATE_PROGRAM_DETAIL:
      return {
        ...state,
        programDetail: action.payload
      };
    case DELETE_EXERCISE_SET_DETAIL:
      console.log("REDUCER", state.programDetail);
      console.log("@", action.payload);
      return {
        ...state,
        programDetail: state.programDetail.filter(
          exercise_set_detail =>
            !action.payload.includes(exercise_set_detail.exercise_set_detail_id)
        )

        // programDetail: state.programDetail.filter(
        //   programDetail =>
        //     programDetail.exercise_set_detail_id !== action.payload
        // )
        // programDetail: action.payload
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
