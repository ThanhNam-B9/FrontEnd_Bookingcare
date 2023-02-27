import React, { Component } from "react";
import { connect } from "react-redux";
import { _getDetailDoctorById } from "../../../../services/userService";
import { LANGUEGA } from "../../../../utils";
import HomeHeader from "../../Selection/HomeHeader";
import DoctorExtrainfor from "./DoctorExtrainfor";
import DoctorSchedule from "./DoctorSchedule";

import "./ViewDetailDoctor.scss";
class ViewDetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctorArr: {},
      currDoctorId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currDoctorId: id,
      });
      let res = await _getDetailDoctorById(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctorArr: res.data,
        });
      }
    }
  }
  render() {
    let { detailDoctorArr, currDoctorId } = this.state;
    let { language } = this.props;
    let nameEn,
      nameVi = "";
    if (detailDoctorArr && detailDoctorArr.positionData) {
      nameVi = ` ${detailDoctorArr.positionData.valueVi} ${detailDoctorArr.firstName} ${detailDoctorArr.lastName}`;
      nameEn = ` ${detailDoctorArr.positionData.valueEn} ${detailDoctorArr.lastName} ${detailDoctorArr.firstName}`;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-doctor-container">
          <div className="introduce-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctorArr && detailDoctorArr.image
                    ? detailDoctorArr.image
                    : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <h2>{language === LANGUEGA.VI ? nameVi : nameEn} || phu san </h2>
              <div className="introduce">
                {detailDoctorArr &&
                detailDoctorArr.Markdown &&
                detailDoctorArr.Markdown.description
                  ? detailDoctorArr.Markdown.description
                  : ""}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="schedule-doctor-left">
              <DoctorSchedule dotorIdFromParent={currDoctorId} />
            </div>
            <div className="schedule-doctor-right">
              <DoctorExtrainfor dotorIdFromParent={currDoctorId} />
            </div>
          </div>
          <div className="details-doctor">
            <h5>{language === LANGUEGA.VI ? nameVi : nameEn} || phu san</h5>
            {detailDoctorArr &&
            detailDoctorArr.Markdown &&
            detailDoctorArr.Markdown.contentHTML ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctorArr.Markdown.contentHTML,
                }}
              />
            ) : (
              ""
            )}
          </div>
          <div className="patient-feedback"></div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewDetailDoctor);
