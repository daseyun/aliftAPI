import React, { Component } from "react";

export class StartWorkout extends Component {
  constructor(props) {
    super(props);
  }

  mapDetailsToTableBody(exerciseDetail) {
    const tbody = [...Array(exerciseDetail.sets)].map((e, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <input
              type="number"
              style={{ width: "50px" }}
              defaultValue={exerciseDetail.reps}
              className="border"
            ></input>
          </td>
          <td>
            <input
              type="number"
              style={{ width: "80px" }}
              className="border"
            ></input>
          </td>
          <td>
            <input type="radio"></input>
          </td>
        </tr>
      );
    });
    return tbody;
  }
  mapProgramToTable(programDetail) {
    const table = programDetail.map((exercise, index) => {
      var tbody = this.mapDetailsToTableBody(exercise);

      return (
        <div key={index}>
          <div>{exercise.exercise_name}</div>
          <table className="table table-sm table-condensed">
            <thead>
              <tr>
                <th>set</th>
                <th>reps</th>
                <th>weight</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{tbody}</tbody>
          </table>
        </div>
      );
    });
    return table;
  }

  render() {
    const programDetail = this.mapProgramToTable(this.props.programDetail);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel-body">
              <br />
              <br />
              {programDetail}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StartWorkout;
