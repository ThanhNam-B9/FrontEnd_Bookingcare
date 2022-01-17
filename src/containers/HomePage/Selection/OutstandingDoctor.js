import React, { Component } from "react";

import Slider from "react-slick";
// Import css files

import { connect } from "react-redux";
class OutstandingDoctor extends Component {
  render() {
    let settings = this.props.settings;
    return (
      <div className="selection-share selection-outstanding-doctor">
        <div className="selection-container">
          <div className="selection-header">
            <span>Bác sĩ nổi bật tuần qua</span>
            <button>xem thêm</button>
          </div>
          <div className="selection-body">
            <Slider {...settings}>
              <div className="selection-custommize">
                <div className="bg-image selection-outstanding-doctor">
                  <div className="bg-avatar">
                    <div className="avatar-doctor"></div>
                    <div className="avartar-name">
                      Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                    </div>
                  </div>
                  <div className="bg-title">
                    <div>Mai Thanh Nam</div>
                  </div>
                </div>
              </div>
              <div className="selection-custommize">
                <div className="bg-image selection-outstanding-doctor">
                  <div className="bg-avatar">
                    <div className="avatar-doctor"></div>
                    <div className="avartar-name">
                      Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                    </div>
                  </div>
                  <div className="bg-title">
                    <div>Mai Thanh Nam</div>
                  </div>
                </div>
              </div>
              <div className="selection-custommize">
                <div className="bg-image selection-outstanding-doctor">
                  <div className="bg-avatar">
                    <div className="avatar-doctor"></div>
                    <div className="avartar-name">
                      Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                    </div>
                  </div>
                  <div className="bg-title">
                    <div>Mai Thanh Nam</div>
                  </div>
                </div>
              </div>
              <div className="selection-custommize">
                <div className="bg-image selection-outstanding-doctor">
                  <div className="bg-avatar">
                    <div className="avatar-doctor"></div>
                    <div className="avartar-name">
                      Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                    </div>
                  </div>
                  <div className="bg-title">
                    <div>Mai Thanh Nam</div>
                  </div>
                </div>
              </div>
              <div className="selection-custommize">
                <div className="bg-image selection-outstanding-doctor">
                  <div className="bg-avatar">
                    <div className="avatar-doctor"></div>
                    <div className="avartar-name">
                      Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                    </div>
                  </div>
                  <div className="bg-title">
                    <div>Mai Thanh Nam</div>
                  </div>
                </div>
              </div>
              <div className="selection-custommize">
                <div className="bg-image selection-outstanding-doctor">
                  <div className="bg-avatar">
                    <div className="avatar-doctor"></div>
                    <div className="avartar-name">
                      Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                    </div>
                  </div>
                  <div className="bg-title">
                    <div>Mai Thanh Nam</div>
                  </div>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
