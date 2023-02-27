import "./DoctorExtrainfor.scss";
import moment from "moment";
import React, { Component } from "react";
import "./ProfileDoctor.scss";
import { connect } from "react-redux";
import { _getProfileDoctorById } from "../../../../services/userService";
import { LANGUEGA } from "../../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProfile: [],
    };
  }
  handleShowPrice = () => {
    this.setState({});
  };
  async componentDidMount() {
    let id = this.props.doctorId;
    let data = await this.getInforDoctor(id);
    this.setState({ dataProfile: data });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
  }
  getInforDoctor = async (id) => {
    let result = [];

    if (id) {
      let res = await _getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUEGA.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUEGA.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");

      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>Miễn phí đặt lịch</div>
        </>
      );
    }
  };
  render() {
    let { dataProfile } = this.state;
    let { language, dataBookingModal } = this.props;

    let nameEn,
      nameVi = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = ` ${dataProfile.positionData.valueVi} ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEn = ` ${dataProfile.positionData.valueEn} ${dataProfile.lastName} ${dataProfile.firstName}`;
    }

    return (
      <div className="introduce-doctor-container">
        <div className="introduce-doctor-modal">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <h2>{language === LANGUEGA.VI ? nameVi : nameEn}</h2>
            <div className="introduce">
              {/* {dataProfile &&
              dataProfile.Markdown &&
              dataProfile.Markdown.description
                ? dataProfile.Markdown.description
                : ""} */}

              {this.renderTimeBooking(dataBookingModal)}
            </div>
          </div>
        </div>
        <div className="price">
          Giá khám:{" "}
          {dataProfile &&
            dataProfile.Doctor_Infor &&
            dataProfile.Doctor_Infor.priceData && (
              <NumberFormat
                className="crruPrice"
                value={
                  language === LANGUEGA.VI
                    ? dataProfile.Doctor_Infor.priceData.valueVi
                    : dataProfile.Doctor_Infor.priceData.valueEn
                }
                displayType={"text"}
                thousandSeparator={true}
                suffix={language === LANGUEGA.VI ? "VND" : "$"}
              />
            )}
          {/* {dataProfile &&
          dataProfile.Doctor_Infor &&
          dataProfile.Doctor_Infor.priceData &&
          language === LANGUEGA.EN
            ? dataProfile.Doctor_Infor.priceData.valueVi
            : ""} */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
