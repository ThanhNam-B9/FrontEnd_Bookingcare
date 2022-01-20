import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import "./ManageDoctor.scss";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import Select from "react-select";
import "react-markdown-editor-lite/lib/index.css";
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      selectedDoctor: "",
    };
  }
  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  handleContentMarkdown = () => {
    console.log("ark", this.state);
  };
  render() {
    const { selectedDoctor, description } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin các Bác sĩ</div>
        <div className="more-info">
          <div className="content-left form-group ">
            <label>Chọn bác sĩ</label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChange}
              options={options}
            />
          </div>
          <div className="content-right form-group">
            <label>Mô tả bác sĩ</label>
            <textarea
              className="form-control"
              rows="5"
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={description}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-info px-2"
          onClick={() => this.handleContentMarkdown()}
        >
          Lưu thông tin
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userRedux: state.admin.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => dispatch(actions.fecthAllUserStart()),
    deleteUser: (userId) => dispatch(actions.fecthDeleteUserStart(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
