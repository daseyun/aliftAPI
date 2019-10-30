import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProgram } from "../../actions/programs";

export class Form extends Component {
  state = {
    program_name: "",
    owner: "",
    exerciseSetDetail: []
  };

  static propTypes = {
    addProgram: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // the name here is name attribute of input.
  onSubmit = e => {
    e.preventDefault();
    const {
      program_name,
      exerciseSetDetail
      // owner
      // etc
    } = this.state;
    const program = { program_name, exerciseSetDetail };
    this.props.addProgram(program);
  };

  render() {
    const { program_name, owner } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Program</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Program Name</label>
            <input
              className="form-control"
              type="text"
              name="program_name"
              onChange={this.onChange}
              value={program_name}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addProgram }
)(Form); // no need for bind in connect because, we simply need to call the action. not bring something back.
