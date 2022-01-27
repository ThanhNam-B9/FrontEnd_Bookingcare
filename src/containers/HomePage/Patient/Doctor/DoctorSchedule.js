import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import "moment/locale/vi";
import { LANGUEGA } from "../../../../utils";
import { _getScheduleDoctorByDate } from "../../../../services/userService";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allTimeInDay: [],
    };
  }

  setArrDays = () => {
    let { language } = this.props;
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
        object.label = moment(currDay).add(i, "days").format("dddd - DD/MM");
      } else {
        object.label = moment(currDay)
          .add(i, "days")
          .locale("en")
          .format("dddd - DD/MM");
      }
      object.value = moment(currDay).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    this.setState({
      allDays: allDays,
    });
  };
  componentDidMount() {
    this.setArrDays();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.setArrDays();
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
  render() {
    let { allDays, allTimeInDay } = this.state;
    let { language } = this.props;
    console.log("allTimeInDay", allTimeInDay);
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
              <i className="far fa-calendar-alt"> Lịch khám</i>
            </span>
          </div>
          <div className="time-content">
            {allTimeInDay && allTimeInDay.length > 0 ? (
              allTimeInDay.map((item, index) => {
                let timeDisplay =
                  language === LANGUEGA.VI
                    ? item.timeTypeData.valueVi
                    : item.timeTypeData.valueEn;
                return <button key={index}>{timeDisplay}</button>;
              })
            ) : (
              <div>Không có lịch khám của bác sĩ trong ngày này</div>
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
