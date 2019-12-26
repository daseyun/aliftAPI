import React, { Component } from "react";

export class ProgramExercises extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = e => {
    this.setState({ isEditState: true });

    this.props.onEditStateChange(e.target.value);
  };

  mapProgramToTable(programDetail) {
    const table = programDetail.map((exercise, exercise_id) => {
      if (exercise.exercise_id === null) {
        console.log("@@@@@@@@@");
      }
      return (
        <tr key={exercise_id}>
          <th scope="row">
            {exercise.exercise_name}

            {/* {exercise_id === 4 ? "Empty" : exercise.exercise_name} */}
          </th>
          <td>
            {exercise.sets} x {exercise.reps}
          </td>
          <td>
            {/* <button hidden disabled className="btn btn-sm btn-primary"> */}
            <button
              style={{ display: this.props.isEditState ? "block" : "none" }}
              className={"btn btn-sm btn-danger disabled"}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return table;
  }

  render() {
    // console.log(this.props.programDetail);

    const programDetail = this.mapProgramToTable(this.props.programDetail);

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Exercise</th>
              <th scope="col">Sets/Reps</th>
              <th scope="col">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={this.handleClick.bind(this)}
                >
                  Edit
                </button>{" "}
              </th>
            </tr>
          </thead>
          <tbody>{programDetail}</tbody>
        </table>
      </div>
    );
  }
}

export default ProgramExercises;
