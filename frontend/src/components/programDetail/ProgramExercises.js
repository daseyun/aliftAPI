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
    const table = programDetail.map((exercise, index) => {
      if (exercise.exercise_id === null) {
      }
      return (
        <tr key={index}>
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
              id={exercise.exercise_set_detail_id}
              style={{ display: this.props.isEditState ? "block" : "none" }}
              className={"btn btn-sm btn-danger"}
              onClick={this.props.deleteExercise.bind(this)}
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
                  className={
                    "btn btn-sm " +
                    (this.props.isEditState
                      ? "btn-outline-danger"
                      : "btn-outline-info")
                  }
                  onClick={this.handleClick.bind(this)}
                >
                  {this.props.isEditState ? (
                    <i className="fa fa-ban"></i>
                  ) : (
                    <i className="fa fa-pencil"></i>
                  )}
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
