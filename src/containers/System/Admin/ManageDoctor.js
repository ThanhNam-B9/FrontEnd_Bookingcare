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
import { FormattedMessage } from "react-intl";
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
      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectPrice: "",
      selectPayment: "",
      selectProvince: "",
      addressClinic: "",
      nameClinic: "",
      note: "",
    };
  }
  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getRequiredDoctorInfor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors, "USERS");
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");

      let dataSelectPayment = this.builDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.builDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");

      let dataSelectPayment = this.builDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.builDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
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
    let { listPrice, listPayment, listProvince } = this.state;
    let res = await _getDetailDoctorById(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let priceId = "",
        paymentId = "",
        provinceId = "",
        addressClinic = "",
        nameClinic = "",
        note = "",
        selectPrice = "",
        selectPayment = "",
        selectProvince = "";
      if (res.data.Doctor_Infor) {
        priceId = res.data.Doctor_Infor.priceId;
        selectPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        paymentId = res.data.Doctor_Infor.paymentId;
        console.log("paymentId", paymentId);
        selectPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        console.log("listPrice", selectPayment);
        provinceId = res.data.Doctor_Infor.provinceId;
        selectProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
      }
      this.setState({
        contentHTML: res.data.Markdown.contentHTML,
        contentMarkdown: res.data.Markdown.contentMarkdown,
        description: res.data.Markdown.description,
        hasOldData: false,
        selectPrice: selectPrice,
        selectPayment: selectPayment,
        selectProvince: selectProvince,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
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
  handleChangeSelectRequired = (selectOntion, name) => {
    let nameOpt = name.name;
    let stateCopy = { ...this.state };
    stateCopy[nameOpt] = selectOntion;
    this.setState({ ...stateCopy });
  };
  handleOnChangeText = (event, id) => {
    // const name = event.target.name;
    // const value = event.target.value;
    // this.setState({
    //   [name]: value,
    // });
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  builDataInputSelect = (inputData, type) => {
    let options = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;

          let labelEn = `${item.firstName} ${item.lastName}`;

          object.label = language === LANGUEGA.VI ? labelVi : labelEn;
          object.value = item.id;
          options.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = item.valueVi;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUEGA.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          options.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = item.valueVi;
          let labelEn = item.valueEn;
          object.label = language === LANGUEGA.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          options.push(object);
        });
      }
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
      selectPrice: this.state.selectPrice.value,
      selectPayment: this.state.selectPayment.value,
      selectProvince: this.state.selectProvince.value,
      addressClinic: this.state.addressClinic,
      nameClinic: this.state.nameClinic,
      note: this.state.note,
    });
  };
  render() {
    const {
      selectedDoctor,
      description,
      listDoctors,
      hasOldData,
      contentMarkdown,
      listPrice,
      listPayment,
      listProvince,
      selectPrice,
      selectPayment,
      selectProvince,
      addressClinic,
      nameClinic,
      note,
    } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-info">
          <div className="content-left form-group ">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChangeSelect}
              options={listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            />
          </div>
          <div className="content-right form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              rows="5"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={description}
              name="description"
            />
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={selectPrice}
              onChange={this.handleChangeSelectRequired}
              options={listPrice}
              name="selectPrice"
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={selectPayment}
              onChange={this.handleChangeSelectRequired}
              options={listPayment}
              name="selectPayment"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={selectProvince}
              onChange={this.handleChangeSelectRequired}
              options={listProvince}
              name="selectProvince"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic-name" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={nameClinic}
              name="nameClinic"
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic-address" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={addressClinic}
              name="addressClinic"
            />
          </div>
          <div className="form-group col-4">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={note}
              name="note"
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
            <FormattedMessage id="admin.manage-doctor.save" />
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-warning px-2"
            onClick={() => this.handleContentMarkdown()}
          >
            <FormattedMessage id="admin.manage-doctor.add" />
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
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.fecthGetAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getRequiredDoctorInfor: () =>
      dispatch(actions.fetchRequiredDoctorInforSrart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
