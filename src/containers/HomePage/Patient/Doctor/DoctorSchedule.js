import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import "moment/locale/vi";
import { LANGUEGA } from "../../../../utils";
import { _getScheduleDoctorByDate } from "../../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allTimeInDay: [],
      isShowBookingModal: false,
      dataBookingModal: {},
    };
  }

  getArrDays = (language) => {
    let currDay = new Date();
    // console.log("moment en: ", moment(currDay).format("dddd - DD/MM"));
    // console.log(
    //   "moment vi: ",
    //   moment(currDay).locale("en").format("dddd - DD/MM")
    // );
    // console.log(language);
    let allDays = [];

    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUEGA.VI) {
        if (i === 0) {
          let ddMM = moment(currDay).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(currDay).add(i, "days").format("dddd - DD/MM");
        }
      } else {
        if (i === 0) {
          let ddMM = moment(currDay).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(currDay)
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }
      object.value = moment(currDay).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  async componentDidMount() {
    let { language } = this.props;

    let allDays = this.getArrDays(language);
    if (allDays && allDays.length > 0) {
      this.setState({
        allDays: allDays,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (prevProps.dotorIdFromParent !== this.props.dotorIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      if (allDays && allDays.length > 0) {
        let res = await _getScheduleDoctorByDate(
          this.props.dotorIdFromParent,
          allDays[0].value
        );
        this.setState({
          allTimeInDay: res.data ? res.data : [],
        });
      }
    }
  }
  handleOnchangeSelect = async (event) => {
    let { dotorIdFromParent } = this.props;

    if (dotorIdFromParent && dotorIdFromParent !== -1) {
      let date = event.target.value;
      let doctorId = dotorIdFromParent;
      let res = await _getScheduleDoctorByDate(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          allTimeInDay: res.data ? res.data : [],
        });
      }
    }
  };
  handleBookingModal = (time) => {
    this.setState({
      isShowBookingModal: true,
      dataBookingModal: time,
    });
  };
  handleCloseBookingModal = () => {
    this.setState({ isShowBookingModal: false });
  };
  render() {
    let { allDays, allTimeInDay, isShowBookingModal, dataBookingModal } =
      this.state;
    let { language } = this.props;

    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule-date">
          <select onChange={(event) => this.handleOnchangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-schedule-time">
          <div className="text-calendar">
            <span>
              <i className="far fa-calendar-alt">
                {" "}
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </i>
            </span>
          </div>
          <div>
            {allTimeInDay && allTimeInDay.length > 0 ? (
              <>
                <div className="time-content">
                  {allTimeInDay.map((item, index) => {
                    let timeDisplay =
                      language === LANGUEGA.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn;
                    return (
                      <button
                        key={index}
                        className={
                          language === LANGUEGA.VI
                            ? "button btn-vi"
                            : "button btn-en"
                        }
                        onClick={() => this.handleBookingModal(item)}
                      >
                        {timeDisplay}
                        <BookingModal
                          isShowBookingModal={isShowBookingModal}
                          closeBookingModal={this.handleCloseBookingModal}
                          dataBookingModal={dataBookingModal}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="book-free">
                  <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                  <i className="fas fa-hand-point-up"></i>{" "}
                  <FormattedMessage id="patient.detail-doctor.book-free" />
                </div>
              </>
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
