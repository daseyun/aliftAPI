import React, { Component } from "react";

export class ProgramExercises extends Component {
  render() {
    console.log(this.props.programDetail);
    // if (this.state.programDetail) {
    //   console.log(this.state.programDetail.programDetail);
    // }
    //   const list = this.state.programDetail.programDetail.map((invoice, index) => {
    //     return (
    //         <tr key={index}>
    //             <td>{invoice[index].description}</td>
    //             <td>{invoice[index].unit}</td>
    //             <td>{invoice[index].quantity}</td>
    //             <td>{invoice[index].unit * invoice[index].quantity}</td>
    //         </tr>
    //     )
    // });

    const programDetail = this.props.programDetail.map(
      (exercise, exercise_id) => {
        console.log(exercise);
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
        <div>[debug: id: {this.props.programId}]</div>
        <div>this is list of exercises/ 4x5 in this program</div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Exercise</th>
              <th scope="col">Sets/Reps</th>
              <th scope="col">
                <button disabled className="btn btn-sm btn-primary">
                  Edit Program
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
