import React, { Component } from "react";
import { Modal } from "reactstrap";
import { connect } from "react-redux";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../../components/Input/DatePicker";
import * as actions from "../../../../../store/actions";
import { LANGUEGA } from "../../../../../utils";

class BookingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namePatient: "",
      phonePatient: "",
      addressPatient: "",
      emailPatient: "",
      reason: "",
      currDate: "",
      genders: "",
      selectGender: this.props.language === LANGUEGA.VI ? "Nam" : "Male",
    };
  }
  handleShowPrice = () => {
    this.setState({});
  };
  builSelectGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUEGA.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  async componentDidMount() {
    this.props.fetchGenderSrart();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        genders: this.builSelectGender(this.props.genders),
      });
    }
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        genders: this.builSelectGender(this.props.genders),
      });
    }
  }
  handleCloseBookingModal = () => {
    this.props.closeBookingModal();
  };
  handleInforPatient = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[name] = value;
    this.setState({ ...stateCopy });
  };
  handleOnchange = (date) => {
    this.setState({
      currDate: date[0],
    });
  };
  handleComfirmInfor = () => {
    console.log("state", this.state);
  };
  render() {
    let { isShowBookingModal, dataBookingModal } = this.props;

    let {
      namePatient,
      phonePatient,
      addressPatient,
      emailPatient,
      reason,
      currDate,
      genders,
      selectGender,
    } = this.state;
    let doctorId =
      dataBookingModal && !_.isEmpty(dataBookingModal)
        ? dataBookingModal.doctorId
        : "";
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    return (
      <>
        <Modal
          isOpen={isShowBookingModal}
          className={"booking-modal-container"}
          centered
          size="lg"
        >
          <div className="booking-modal-content" style={{ height: "500px" }}>
            <div className="booking-modal-header">
              <span className="left">Thông tin đặt lịch khám</span>
              <span className="right">
                <i
                  className="fas fa-times"
                  onClick={() => this.handleCloseBookingModal()}
                ></i>
              </span>
            </div>
            <div className="booking-modal-body">
              {/* {JSON.stringify(dataBookingModal)} */}
              <div className="infor-doctor">
                <ProfileDoctor
                  doctorId={doctorId}
                  dataBookingModal={dataBookingModal}
                />
              </div>

              <div className="row">
                <div className="col-6 form-group">
                  <input
                    name="namePatient"
                    placeholder="Họ và tên"
                    type="text"
                    className="form-control"
                    value={namePatient}
                    onChange={(event) => this.handleInforPatient(event)}
                  />
                </div>
                <div className="col-6 form-group">
                  <input
                    placeholder="Số điện thoại"
                    type="text"
                    className="form-control"
                    onChange={(event) => this.handleInforPatient(event)}
                    name="phonePatient"
                    value={phonePatient}
                  />
                </div>
                <div className="col-6 form-group">
                  <input
                    placeholder="Địa chỉ email"
                    type="text"
                    className="form-control"
                    onChange={(event) => this.handleInforPatient(event)}
                    name="emailPatient"
                    value={emailPatient}
                  />
                </div>
                <div className="col-6 form-group">
                  <input
                    placeholder="Địa chỉ liên hệ"
                    type="text"
                    className="form-control"
                    onChange={(event) => this.handleInforPatient(event)}
                    name="addressPatient"
                    value={addressPatient}
                  />
                </div>
                <div className="col-12 form-group">
                  <input
                    placeholder="Lý do khám"
                    type="text"
                    className="form-control"
                    onChange={(event) => this.handleInforPatient(event)}
                    name="reason"
                    value={reason}
                  />
                </div>
                <div className="col-6 form-group">
                  <DatePicker
                    value={currDate}
                    minDate={yesterday}
                    onChange={this.handleOnchange}
                    className="form-control"
                    placeholder="Ngày sinh"
                  />
                </div>
                <div className="col-6 form-group">
                  <select
                    className="form-control"
                    onChange={this.handleInforPatient}
                    name="selectGender"
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {item.label}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button className="btn-confirm" onClick={this.handleComfirmInfor}>
                Xác nhận
              </button>
              <button
                className="btn-cancel"
                onClick={() => this.handleCloseBookingModal()}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchGenderSrart: () => dispatch(actions.fetchGenderSrart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
