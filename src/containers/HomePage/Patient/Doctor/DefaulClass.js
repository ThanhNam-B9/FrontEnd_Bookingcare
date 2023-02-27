import "./DoctorExtrainfor.scss";

import React, { Component } from "react";

import { connect } from "react-redux";

class DefaulClass extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleShowPrice = () => {
    this.setState({});
  };
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
  }
  render() {
    return <div></div>;
  }
}
const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DefaulClass);
