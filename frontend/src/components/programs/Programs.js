import React, { Component, Fragment } from "react";

// to work with redux from any component, use connect
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { getPrograms, deleteProgram } from "../../actions/programs";

export class Programs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // like a signature. will throw error if those makred in required dont show up. Not necessary. good praactice.
  static propTypes = {
    programs: PropTypes.array.isRequired,
    getPrograms: PropTypes.func.isRequired,
    deleteProgram: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPrograms();
  }

  handleClick = e => {
    this.setState({ redirectProgramId: e });
  };
  render() {
    if (this.state.redirectProgramId) {
      return <Redirect push to={"/program/" + this.state.redirectProgramId} />;
    }
    return (
      <Fragment>
        <h2>Programs</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>ProgramName</th>
              <th>Owner</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.programs.map(program => (
              <tr
                onClick={this.handleClick.bind(this, program.id)}
                key={program.id}
              >
                <td>{program.id}</td>
                <td>{program.program_name}</td>
                <td>{program.owner}</td>
                <td>
                  <button
                    onClick={this.props.deleteProgram.bind(this, program.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  programs: state.programs.programs // state,programs calls the reducer. second .program calls the property in the reducer.
});

export default connect(
  mapStateToProps,
  { getPrograms, deleteProgram } // this gives us access to these props to use above.
)(Programs); // wrapped in connect for redux
