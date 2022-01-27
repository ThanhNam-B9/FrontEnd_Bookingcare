import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { connect } from "react-redux";
import "./ManagerSchedule.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { dateFormat, LANGUEGA } from "../../../utils";
import moment from "moment";
import _, { isEmpty, result } from "lodash";
import { toast } from "react-toastify";
import { _postBulkCreateSchedule } from "../../../services/userService";
class ManagerSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: "",
      currDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getAllcodeScheduleTime();
  }
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
    if (prevProps.allScheduleTimes !== this.props.allScheduleTimes) {
      let data = this.props.allScheduleTimes;
      if (data && data.length > 0) {
        data = data.map((item) =>
          //cách 1
          // item.isSelected = false;
          // return item;
          //cách 2
          ({ ...item, isSelected: false })
        );
        console.log("data", data);
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };
  handleOnchange = (date) => {
    this.setState({
      currDate: date[0],
    });
  };
  handleClickBtnTime = (timeOpt) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === timeOpt.id) {
          item.isSelected = !item.isSelected;
          return item;
        }
        this.setState({
          rangeTime: rangeTime,
        });
      });
    }
  };
  hanleSaveScheduleTime = async () => {
    let { selectedDoctor, currDate, rangeTime } = this.state;
    let result = [];
    let formatCurrDate = new Date(currDate).getTime(); // dùng js
    console.log("formatCurrDate", formatCurrDate);
    if (!selectedDoctor & _.isEmpty(selectedDoctor)) {
      toast.error("error doctor");
      return;
    }
    if (!currDate) {
      toast.error("error date");
      return;
    }
    if (rangeTime && rangeTime.length > 0) {
      let selecctedTimes = rangeTime.filter((item) => item.isSelected === true);
      // let formatCurrDate = moment(currDate); // dùng moment
      if (selecctedTimes && selecctedTimes.length > 0) {
        selecctedTimes.map((item) => {
          let opject = {};
          opject.doctorId = selectedDoctor.value;
          opject.date = formatCurrDate;
          opject.timeType = item.keyMap;
          result.push(opject);
        });
      } else {
        toast.error("error time");
        return;
      }
      console.log("result", result);
    }
    let res = await _postBulkCreateSchedule({
      arrSchedule: result,
      formatCurrDate: formatCurrDate,
      doctorId: selectedDoctor.value,
    });
    console.log("res", res);
  };
  render() {
    const { language } = this.props;
    const { listDoctors, selectedDoctor, currDate, rangeTime } = this.state;

    return (
      <div className="manager-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChangeSelect}
                options={listDoctors}
              />
            </div>

            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>

              <DatePicker
                value={currDate}
                minDate={new Date()}
                onChange={this.handleOnchange}
                className="form-control"
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      type="button"
                      className={
                        item.isSelected
                          ? "btn btn-outline-warning active m-2 px-3"
                          : "btn btn-outline-warning m-2 px-3"
                      }
                      key={index}
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {language === LANGUEGA.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary px-2 mt-2"
                onClick={() => this.hanleSaveScheduleTime()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTimes: state.admin.allScheduleTimes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.fecthGetAllDoctor()),
    getAllcodeScheduleTime: () => dispatch(actions.fecthAllcodeScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSchedule);
