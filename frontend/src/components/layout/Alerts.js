import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.program_name)
        alert.error(`Program Name: ${error.msg.program_name.join()}`); // msg because msg is name of the prop in state.
      if (error.msg.owner) alert.error(`Owner: ${error.msg.owner.join()}`);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`);
    }

    if (message !== prevProps.message) {
      if (message.deleteProgram) alert.success(message.deleteProgram);
      if (message.addProgram) alert.success(message.addProgram);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
