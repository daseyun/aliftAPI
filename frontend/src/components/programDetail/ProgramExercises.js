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

  render() {
    // console.log(this.props.programDetail);

    const programDetail = this.props.programDetail.map(
      (exercise, exercise_id) => {
        // var exercise_id = exercise_id - 1;
        return (
          <tr key={exercise_id}>
            <th scope="row">{exercise.exercise_name}</th>
            <td>
              {exercise.sets} x {exercise.reps}
            </td>
            <td>
              <button hidden disabled className="btn btn-sm btn-primary">
                Edit
              </button>
            </td>
          </tr>
        );
      }
    );

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
