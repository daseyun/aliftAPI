import React, { Component } from "react";

export class ProgramExercises extends Component {
  render() {
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
          <tbody>
            <tr>
              <th scope="row">Bench Press</th>
              <td>5x5</td>
              <td>
                <button hidden disabled className="btn btn-sm btn-primary">
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">Shoulder Press</th>
              <td>3x8</td>
              <td>
                <button hidden disabled className="btn btn-sm btn-primary">
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">Incline Press</th>
              <td>3x8</td>
              <td>
                <button hidden disabled className="btn btn-sm btn-primary">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProgramExercises;
