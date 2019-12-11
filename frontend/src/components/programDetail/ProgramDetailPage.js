// import Form from './Form';
// import Programs from './Programs';

import React, { Component, Fragment } from "react";
import ProgramExercises from "./ProgramExercises";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { getProgram, getProgramDetail } from "../../actions/programDetail";

export class ProgramDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
  }

  ready = () => {
    console.log("program: ", this.props.program);
    console.log(this.props.programDetail);
  };

  componentDidMount() {
    // get current program
    this.props.getProgram(this.props.match.params.programId);
    this.props.getProgramDetail(this.props.match.params.programId);

    // this.sleep(500).then(() => {
    //   //do stuff
    //   console.log("*", this.props.program.program_name);
    // });
  }

  render() {
    const { programId } = this.props.match.params;
    if (this.props.program && this.props.programDetail) {
      this.ready();
      return (
        <Fragment>
          {/* TODO: get program name via query */}
          <h3>{this.props.program.program_name}</h3>
          {/* TODO: get exercise set details via query */}
          <ProgramExercises programId={programId} />

          <div className="text-info">
            //start workout button goes to another page for recording
            ExerciseWeight Table
          </div>
          {/* TODO: build new page for this later (or load new js stuff) 
        Loading new js stuff might be faster and cleaner code and looks wise*/}
          <button disabled className="btn btn-primary btn-lg btn-block">
            Start Workout
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
  programDetail: state.programDetail.programDetail
});

export default connect(
  mapStateToProps,
  { getProgram, getProgramDetail } // this gives us access to these props to use above.
)(ProgramDetailPage); // wrapped in connect for redux
