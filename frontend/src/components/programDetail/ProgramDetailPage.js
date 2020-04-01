// import Form from './Form';
// import Programs from './Programs';

import React, { Component, Fragment } from "react";
import ProgramExercises from "./ProgramExercises";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {
  getProgram,
  getProgramDetail,
  updateProgramDetail,
  deleteExerciseSetDetail
} from "../../actions/programDetail";
import { toggleProgramActive } from "../../actions/programs";
import { getExercises } from "../../actions/exercises";
import StartWorkout from "./StartWorkout";

export class ProgramDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditState: false,
      exercisesToDelete: [],
      isWorkoutInProgress: false,
      newExercisesCt: -1
    };

    this.handleEditStateChange = this.handleEditStateChange.bind(this);
    this.sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
  }

  ready = () => {
    console.log("ready");
    console.log(this.props);
    console.log("program: ", this.props.program);
    console.log("isworkoutinprogress", this.state.isWorkoutInProgress);
    // console.log(this.props.programDetail);
    // console.log("exercises", this.props.exercises);
  };
  handleEditStateChange = value => {
    this.setState({ isEditState: !this.state.isEditState });
    // console.log("handleChange", this.state.isEditState);

    // this.setState({ value });
  };
  componentDidMount() {
    // console.log(this.state);
    // get current program
    this.props.getExercises(); // TODO: NEW
    this.props.getProgram(this.props.match.params.programId);
    this.props.getProgramDetail(this.props.match.params.programId);

    // this.sleep(500).then(() => {
    //   //do stuff
    //   console.log("*", this.props.program.program_name);
    // });
  }

  formatExerciseSelect(exercises) {
    const select = exercises.map((exercise, index) => {
      return (
        <option key={index} value={exercise.exercise_id}>
          {exercise.exercise_name}
        </option>
      );
    });
    return select;
  }

  handleExerciseInputChange = event => {
    var changedRow = event.target.id;
    var exerciseId = parseInt(event.target.value);
    var exerciseName = null;
    for (var i in this.props.exercises) {
      if (this.props.exercises[i].exercise_id === exerciseId) {
        exerciseName = this.props.exercises[i].exercise_name;
      }
    }
    this.props.programDetail[changedRow].exercise_id = exerciseId;
    this.props.programDetail[changedRow].exercise_name = exerciseName;
  };

  handleSetInputChange = event => {
    var changedRow = event.target.id;
    var newValue = event.target.value;

    this.props.programDetail[changedRow].sets = newValue;
  };

  handleRepInputChange = event => {
    var changedRow = event.target.id;
    var newValue = event.target.value;
    this.props.programDetail[changedRow].reps = newValue;
  };

  getNumOfRows() {
    return this.props.programDetail.length;
  }

  addExerciseRow = e => {
    // for presetting unselected exercise
    var emptyExercise = {
      exercise_id: null
    };
    this.props.exercises.unshift(emptyExercise);
    var exercises = this.formatExerciseSelect(this.props.exercises);

    var newRow = {
      exercise_set_detail_id: this.state.newExercisesCt,
      exercise_id: null,
      exercise_name: (
        <select
          id={this.getNumOfRows()}
          onChange={this.handleExerciseInputChange}
          className="form-control"
        >
          {exercises}
        </select>
      ),
      sets: (
        <input
          id={this.getNumOfRows()}
          onChange={this.handleSetInputChange}
          size="2"
        ></input>
      ),
      reps: (
        <input
          id={this.getNumOfRows()}
          onChange={this.handleRepInputChange}
          size="2"
        ></input>
      ),
      exercise_order: this.getNumOfRows() + 1
    };
    var programExercises = this.props.programDetail;
    programExercises.push(newRow);

    this.props.programDetail[this.getNumOfRows() - 1].order = this.getNumOfRows;

    this.setState({ newExercisesCt: this.state.newExercisesCt - 1 });
  };

  deleteExercise = e => {
    var exercise_set_detail_id = parseInt(event.target.id);
    // console.log(changedRow);
    // console.log(event.target);
    console.log(exercise_set_detail_id);
    var toDelete = this.state.exercisesToDelete.concat(exercise_set_detail_id);
    console.log(this.props.programDetail);

    // reflect on view
    for (var i in this.props.programDetail) {
      console.log(";", i, this.props.programDetail[i].exercise_set_detail_id);
      if (
        this.props.programDetail[i].exercise_set_detail_id ===
        exercise_set_detail_id
      ) {
        this.props.programDetail.splice(i, 1);
      }
    }
    this.setState({ exercisesToDelete: toDelete });
  };

  toggleProgramActive = e => {
    this.props.program.isactive = !this.props.program.isactive;
    this.props.toggleProgramActive(this.props.program.id);
    this.setState(this);
  };

  startWorkout() {
    this.setState({ isWorkoutInProgress: true });
    console.log("START WORKOUT");
  }

  endWorkout() {
    this.setState({ isWorkoutInProgress: false });
    console.log("END WORKOUT");
  }

  saveProgramChanges() {
    console.log("SAVE PROGRAMs");
    console.log(this.props.programDetail);
    console.log("state", this.state.exercisesToDelete);

    this.props.deleteExerciseSetDetail(this.state.exercisesToDelete);
    this.props.updateProgramDetail(this.props.programDetail);
    this.setState({ isEditState: false });
  }

  render() {
    const { programId } = this.props.match.params;
    if (
      this.props.program &&
      this.props.programDetail &&
      this.props.exercises
    ) {
      this.ready();
      if (this.state.isWorkoutInProgress) {
        console.log("7777");
        return (
          <Fragment>
            <StartWorkout />
          </Fragment>
        );
      }
      return (
        <Fragment>
          {/* TODO: get program name via query */}
          <div className="d-flex flex-row">
            <div className="p-2">
              <h3>{this.props.program.program_name}</h3>
            </div>

            <div className="d-flex align-items-center">
              <h4>
                <i
                  onClick={this.toggleProgramActive.bind(this)}
                  className={
                    this.props.program.isactive
                      ? "fa fa-star text-warning "
                      : "fa fa-star-o text-warning"
                  }
                ></i>
              </h4>
            </div>
          </div>

          {/* TODO: get exercise set details via query */}
          <ProgramExercises
            programId={programId}
            programDetail={this.props.programDetail}
            isEditState={this.state.isEditState}
            onEditStateChange={this.handleEditStateChange}
            deleteExercise={this.deleteExercise}
          />

          {this.state.isEditState ? (
            <button
              className={"btn btn-primary btn-lg btn-block"}
              onClick={this.addExerciseRow.bind(this)}
            >
              Add Exercise
            </button>
          ) : null}

          {/* TODO: build new page for this later (or load new js stuff) 
        Loading new js stuff might be faster and cleaner code and looks wise*/}
          <button
            className={
              "btn btn-primary btn-lg btn-block " +
              (this.state.isEditState ? "d-none " : "") +
              (this.state.isWorkoutInProgress ? "btn-danger " : "btn-success s")
            }
            onClick={
              this.state.isWorkoutInProgress
                ? this.endWorkout.bind(this)
                : this.startWorkout.bind(this)
            }
          >
            {this.state.isWorkoutInProgress ? "End Workout" : "Start Workout"}
          </button>
          <button
            className={
              "btn btn-primary btn-lg btn-block " +
              (this.state.isEditState ? "btn-warning" : "d-none")
            }
            onClick={this.saveProgramChanges.bind(this)}
          >
            Save Changes
          </button>
          {/* <button
            className={
              "btn btn-primary btn-lg btn-block btn-danger " +
              (this.state.isWorkoutInProgress ? "" : "d-none")
            }
            onClick={
              this.state.isEditState
                ? this.saveProgramChanges.bind(this)
                : this.startWorkout.bind(this)
            }
          >
            End Workout
          </button> */}
        </Fragment>
      );
    } else {
      return <Fragment></Fragment>;
    }
    // <div>Hello Program Detail Page </div>;
  }
}

// export default ProgramDetailPage;

const mapStateToProps = state => ({
  program: state.programDetail.program, // state,programs calls the reducer. second .program calls the property in the reducer.
  programDetail: state.programDetail.programDetail,
  exercises: state.exercises.exercises
});

export default connect(
  mapStateToProps,
  {
    getProgram,
    getProgramDetail,
    getExercises,
    updateProgramDetail,
    deleteExerciseSetDetail,
    toggleProgramActive
  } // this gives us access to these props to use above.
)(ProgramDetailPage); // wrapped in connect for redux
