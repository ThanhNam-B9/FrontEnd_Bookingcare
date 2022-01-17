import React, { Component } from "react";

import Slider from "react-slick";

import { connect } from "react-redux";
class Handbook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="selection-share selection-handbook">
        <div className="selection-container">
          <div className="selection-header">
            <span>Cẩm Năng</span>
            <button>xem thêm</button>
          </div>
          <div className="selection-body">
            <Slider {...this.props.settings}>
              <div className="selection-custommize">
                <div className="bg-image selection-handbook"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-handbook"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-handbook"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-handbook"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-handbook"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-handbook"></div>
                <div>Cơ xương khớp</div>
              </div>

              <div className="selection-custommize">
                <div className="bg-image selection-handbook"></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
