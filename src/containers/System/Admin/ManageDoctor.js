import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import "./ManageDoctor.scss";
import { changesActions, LANGUEGA } from "../../../utils";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import Select from "react-select";
import "react-markdown-editor-lite/lib/index.css";
import { _getDetailDoctorById } from "../../../services/userService";
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      selectedDoctor: "",
      listDoctors: [],
      hasOldData: true,
    };
  }
  componentDidMount() {
    this.props.getAllDoctors();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }
  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await _getDetailDoctorById(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      this.setState({
        contentHTML: res.data.Markdown.contentHTML,
        contentMarkdown: res.data.Markdown.contentMarkdown,
        description: res.data.Markdown.description,
        hasOldData: false,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: true,
      });
    }
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  builDataInputSelect = (inputData) => {
    let options = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUEGA.VI ? labelVi : labelEn;
        object.value = item.id;
        options.push(object);
      });
    }
    return options;
  };
  handleContentMarkdown = () => {
    this.props.saveDetailDoctor({
      doctorId: this.state.selectedDoctor.value,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      action: this.state.hasOldData
        ? changesActions.CREATE
        : changesActions.EDIT,
    });
  };
  render() {
    const {
      selectedDoctor,
      description,
      listDoctors,
      hasOldData,
      contentMarkdown,
    } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin các Bác sĩ</div>
        <div className="more-info">
          <div className="content-left form-group ">
            <label>Chọn bác sĩ</label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChangeSelect}
              options={listDoctors}
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
            value={contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        {hasOldData ? (
          <button
            type="button"
            className="btn btn-info px-2"
            onClick={() => this.handleContentMarkdown()}
          >
            Lưu thông tin
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-warning px-2"
            onClick={() => this.handleContentMarkdown()}
          >
            Edit thông tin
          </button>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userRedux: state.admin.users,
    allDoctors: state.admin.allDoctors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.fecthGetAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
