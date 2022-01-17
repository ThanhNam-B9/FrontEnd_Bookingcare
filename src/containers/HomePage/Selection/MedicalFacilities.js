import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

class MedicalFacilities extends Component {
  render() {
    let settings = this.props.settings;
    return (
      <div className="selection-share selection-medical-facilities">
        <div className="selection-container">
          <div className="selection-header">
            <span>Cơ sở y tế</span>
            <button>xem thêm</button>
          </div>
          <div className="selection-body">
            <Slider {...settings}>
              <div className="selection-custommize">
                <div className="bg-image selection-medical-facilities"></div>
                <div>Hệ thống Y tế Thu Cúc</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-medical-facilities"></div>
                <div>Hệ thống Y tế Thu Cúc</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-medical-facilities"></div>
                <div>Hệ thống Y tế Thu Cúc</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-medical-facilities"></div>
                <div>Hệ thống Y tế Thu Cúc</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-medical-facilities"></div>
                <div>Hệ thống Y tế Thu Cúc</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-medical-facilities"></div>
                <div>Hệ thống Y tế Thu Cúc</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-medical-facilities"></div>
                <div>Hệ thống Y tế Thu Cúc</div>
              </div>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageRedux: (language) => dispatch(changeLanguegaApp(language)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacilities);
