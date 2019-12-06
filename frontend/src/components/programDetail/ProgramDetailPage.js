// import Form from './Form';
// import Programs from './Programs';

import React, { Component, Fragment } from "react";
import ProgramExercises from "./ProgramExercises";

export class ProgramDetailPage extends Component {
  render() {
    const { programId } = this.props.match.params;
    return (
      <Fragment>
        <ProgramExercises programId={programId} />
      </Fragment>
    );
    // <div>Hello Program Detail Page </div>;
  }
}

export default ProgramDetailPage;
