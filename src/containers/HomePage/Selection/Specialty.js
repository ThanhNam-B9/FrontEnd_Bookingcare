import React, { Component } from "react";

import Slider from "react-slick";
// Import css files

import { connect } from "react-redux";
class Specialty extends Component {
  render() {
    let settings = this.props.settings;

    return (
      <div className="selection-share selection-specialty">
        <div className="selection-container">
          <div className="selection-header">
            <span>Chuyên khoa phổ biến</span>
            <button>xem thêm</button>
          </div>
          <div className="selection-body">
            <Slider {...settings}>
              <div className="selection-custommize">
                <div className="bg-image selection-specialty"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-specialty"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-specialty"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-specialty"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-specialty"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-specialty"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-specialty"></div>
                <div>Cơ xương khớp</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
