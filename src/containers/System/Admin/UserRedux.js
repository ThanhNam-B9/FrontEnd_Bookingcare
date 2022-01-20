import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { changesActions, LANGUEGA, CommonUtils } from "../../../utils";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpenPreImg: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      actions: changesActions.CREATE,
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let genderKey = this.props.genderRedux;

      this.setState({
        genderArr: this.props.genderRedux,
        gender: genderKey && genderKey.length > 0 ? genderKey[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let positionKey = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position:
          positionKey && positionKey.length > 0 ? positionKey[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let roleKey = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: roleKey && roleKey.length > 0 ? roleKey[0].keyMap : "",
      });
    }
    if (prevProps.userRedux !== this.props.userRedux) {
      this.setState({
        userId: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        previewImgURL: "",
        gender:
          this.state.genderArr && this.state.genderArr.length > 0
            ? this.state.genderArr[0].keyMap
            : "",

        position:
          this.state.positionArr && this.state.positionArr.length > 0
            ? this.state.positionArr[0].keyMap
            : "",
        role:
          this.state.roleArr && this.state.roleArr.length > 0
            ? this.state.roleArr[0].keyMap
            : "",
        avatar: "",
        actions: changesActions.CREATE,
        previewImgURL: "",
      });
    }
  }
  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let opjectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: opjectUrl,
        avatar: base64,
      });
    }
  };
  isChangeOpenPreImg = () => {
    this.setState({
      isOpenPreImg: !this.state.isOpenPreImg,
    });
  };
  handleOnChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  checkValideInput = () => {
    let isValid = true;
    let arrayCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrayCheck.length; i++) {
      if (!this.state[arrayCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrayCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isInput = this.checkValideInput();
    if (isInput === false) return;
    let { actions } = this.state;
    if (actions === changesActions.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        positionId: this.state.position,
        roleId: this.state.role,
        image: this.state.avatar,
      });
    }
    if (actions === changesActions.EDIT) {
      this.props.editeUser({
        id: this.state.userId,
        password: this.state.password,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        positionId: this.state.position,
        roleId: this.state.role,
        image: this.state.avatar,
      });
    }
  };
  handleEditUserFromPater = (data) => {
    let imageBase64 = "";
    if (data.image) {
      imageBase64 = new Buffer(data.image, "base64").toString("binary");
    }

    this.setState({
      userId: data.id,
      email: data.email,
      password: "HackCode",
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phonenumber,
      address: data.address,
      gender: data.gender,
      position: data.positionId,
      role: data.roleId,
      avatar: "",
      actions: changesActions.EDIT,
      previewImgURL: imageBase64,
    });
  };
  render() {
    let { language, isLoadGender } = this.props;
    let {
      genderArr,
      positionArr,
      roleArr,
      isOpenPreImg,
      previewImgURL,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      actions,
    } = this.state;
    return (
      <div className="user-redux-container mb-3">
        <div className="title">
          Learn React-Redux with "TNam IT" at channel "Hoi Dan IT"
        </div>
        <div className="container">
          <div className="row">
            {" "}
            <div>
              <FormattedMessage id="manage-user.add" />
            </div>
            {isLoadGender ? (
              <div className="col-12">isloaing...</div>
            ) : (
              <div className="col-12"></div>
            )}
            <div className="row mt-2">
              <div className="col-md-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  value={email}
                  name="email"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  disabled={actions === changesActions.EDIT ? true : false}
                />
              </div>
              <div className="col-md-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  value={password}
                  name="password"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  disabled={actions === changesActions.EDIT ? true : false}
                />
              </div>
              <div className="col-md-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  value={firstName}
                  name="firstName"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="col-md-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  value={lastName}
                  name="lastName"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
              <div className="col-md-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  value={phoneNumber}
                  name="phoneNumber"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                />
              </div>
              <div className="col-md-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  value={address}
                  name="address"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  type="text"
                  className="form-control"
                  placeholder="Address"
                />
              </div>
              <div className="col-md-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  name="gender"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  value={gender}
                >
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUEGA.VI
                            ? item.valueVi
                            : item.valueEn}{" "}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  name="position"
                  value={position}
                >
                  {positionArr &&
                    positionArr.length > 0 &&
                    positionArr.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUEGA.VI
                            ? item.valueVi
                            : item.valueEn}{" "}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-3">
                <label>
                  <FormattedMessage id="manage-user.role-id" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.handleOnChangeInput(event)}
                  name="role"
                  value={role}
                >
                  {roleArr &&
                    roleArr.length > 0 &&
                    roleArr.map((item, index) => {
                      return (
                        <option keyMap={index} value={item.keyMap}>
                          {language === LANGUEGA.VI
                            ? item.valueVi
                            : item.valueEn}{" "}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>

                <div className="avatar-load">
                  <input
                    type="file"
                    className="form-control-file"
                    id="loadImg"
                    onChange={(event) => this.handleOnChangeImg(event)}
                    hidden
                  />
                  <label htmlFor="loadImg" className="btn-load">
                    Tải ảnh
                    <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-load"
                    onClick={() => this.isChangeOpenPreImg()}
                    style={{
                      backgroundImage: `url(${previewImgURL})`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={
                actions === changesActions.CREATE
                  ? "btn btn-primary mt-2 px-2"
                  : "btn btn-secondary mt-2 px-2"
              }
              onClick={() => this.handleSaveUser()}
            >
              {actions === changesActions.CREATE ? (
                <FormattedMessage id="manage-user.save" />
              ) : (
                <FormattedMessage id="manage-user.edit" />
              )}
            </button>
            <div className="col-12 mt-3 px-0">
              <TableManageUser handleEditUser={this.handleEditUserFromPater} />
            </div>
          </div>
        </div>
        {isOpenPreImg && (
          <Lightbox
            mainSrc={previewImgURL}
            onCloseRequest={() => this.isChangeOpenPreImg()}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadGender: state.admin.isLoadGender,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    userRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //  processLogout: () => dispatch(actions.processLogout()),
    getGenderStart: () => dispatch(actions.fetchGenderSrart()),
    getPositionStart: () => dispatch(actions.fetchPositionSrart()),
    getRoleStart: () => dispatch(actions.fecthRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editeUser: (data) => dispatch(actions.fecthEditeUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
