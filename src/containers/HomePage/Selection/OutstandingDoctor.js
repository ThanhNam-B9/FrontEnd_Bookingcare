import React, { Component } from "react";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
// Import css files
import { connect } from "react-redux";
import { LANGUEGA } from "../../../utils";
import { FormattedMessage } from "react-intl";
class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDoctorArr: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        topDoctorArr: this.props.topDoctors,
      });
    }
  }
  async componentDidMount() {
    this.props.loadTopdoctor();
  }
  render() {
    let { topDoctorArr } = this.state;
    let { language } = this.props;

    let settings = this.props.settings;
    return (
      <div className="selection-share selection-outstanding-doctor">
        <div className="selection-container">
          <div className="selection-header">
            <span>
              <FormattedMessage id="homepage.out-standing-doctor.top-doctor-week" />
            </span>
            <button>
              <FormattedMessage id="homepage.out-standing-doctor.see-more" />
            </button>
          </div>
          <div className="selection-body">
            <Slider {...settings}>
              {topDoctorArr &&
                topDoctorArr.length > 0 &&
                topDoctorArr.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = ` ${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                  let nameEn = ` ${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;

                  return (
                    <div className="selection-custommize" key={index}>
                      <div className="bg-image selection-outstanding-doctor">
                        <div className="bg-avatar">
                          <div
                            className="avatar-doctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          ></div>
                          <div className="avartar-name">
                            {language === LANGUEGA.VI ? nameVi : nameEn}
                          </div>
                        </div>
                        <div className="bg-title">
                          <div>Mai Thanh Nam</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctors: state.admin.topDoctors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadTopdoctor: () => dispatch(actions.fecthGetTopDoctor()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
