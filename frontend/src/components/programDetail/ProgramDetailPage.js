// import Form from './Form';
// import Programs from './Programs';

import React, { Component, Fragment } from "react";
import ProgramExercises from "./ProgramExercises";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { getProgram, getProgramDetail } from "../../actions/programDetail";
import { getExercises } from "../../actions/exercises";

export class ProgramDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditState: false };

    this.handleEditStateChange = this.handleEditStateChange.bind(this);
    this.sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
  }

  ready = () => {
    console.log("ready");
    console.log("program: ", this.props.program);
    console.log(this.props.programDetail);
    console.log("exercises", this.props);
  };
  handleEditStateChange = value => {
    this.setState({ isEditState: !this.state.isEditState });
    // console.log("handleChange", this.state.isEditState);

    // this.setState({ value });
  };
  componentDidMount() {
    console.log(this.state);
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
    const select = exercises.map((exercise, exercise_id) => {
      return (
        <option key={exercise_id} value="exercise_id">
          {exercise.exercise_name}
        </option>
      );
    });
    return select;
  }

  addExerciseRow = e => {
    console.log("addexercisebuttonpressed");
    var exercises = this.formatExerciseSelect(this.props.exercises);
    var newRow = {
      exercise_id: null,
      exercise_name: <select className="form-control">{exercises}</select>,
      sets: <input size="2"></input>,
      reps: <input size="2"></input>
    };
    var exercises = this.props.programDetail;
    exercises.push(newRow);
    this.setState(this.state);
    console.log(this.state);
    console.log(this.props);
  };

  render() {
    const { programId } = this.props.match.params;
    if (
      this.props.program &&
      this.props.programDetail &&
      this.props.exercises
    ) {
      this.ready();
      return (
        <Fragment>
          {/* TODO: get program name via query */}
          <h3>{this.props.program.program_name}</h3>
          {/* TODO: get exercise set details via query */}
          <ProgramExercises
            programId={programId}
            programDetail={this.props.programDetail}
            isEditState={this.state.isEditState}
            onEditStateChange={this.handleEditStateChange}
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
              (this.state.isEditState ? "btn-warning" : "btn-success")
            }
          >
            {this.state.isEditState ? "Save Changes" : "Start Workout"}
          </button>
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
  { getProgram, getProgramDetail, getExercises } // this gives us access to these props to use above.
)(ProgramDetailPage); // wrapped in connect for redux
