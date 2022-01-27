import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { changeLanguegaApp } from "../../../store/actions/appActions";
import { LANGUEGA } from "../../../utils";
import { withRouter } from "react-router";
class HomeHeader extends Component {
  changeLangueg = (language) => {
    this.props.changeLanguageRedux(language);
  };
  handleBackToHomePage = () => {
    this.props.history.push("/home");
  };
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.handleBackToHomePage()}
              ></div>
            </div>
            <div className="center-content">
              <div className="center-context">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="home-headers.specialist" />
                  </b>
                </div>
                <span>
                  <FormattedMessage id={"home-headers.search-doctor"} />
                </span>
              </div>
              <div className="center-context">
                <div>
                  <b>
                    <FormattedMessage id={"home-headers.health-facilities"} />
                  </b>
                </div>
                <span>
                  <FormattedMessage id={"home-headers.choose-hospital"} />
                </span>
              </div>
              <div className="center-context">
                <div>
                  <b>
                    <FormattedMessage id={"home-headers.doctor"} />
                  </b>
                </div>
                <span>
                  <FormattedMessage id={"home-headers.choose-good-doctor"} />
                </span>
              </div>
              <div className="center-context">
                <div>
                  <b>
                    <FormattedMessage id={"home-headers.examination-package"} />
                  </b>
                </div>
                <span>
                  <FormattedMessage id={"home-headers.general-health-check"} />
                </span>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <div>
                  <FormattedMessage id={"home-headers.support"} />
                </div>
              </div>
              <div className="lang">
                <div
                  className={
                    this.props.language === LANGUEGA.VI
                      ? "lang-vi action"
                      : "lang-vi"
                  }
                >
                  <span onClick={() => this.changeLangueg(LANGUEGA.VI)}>
                    VI
                  </span>
                </div>
                <div
                  className={
                    this.props.language === LANGUEGA.EN
                      ? "lang-en action"
                      : "lang-en"
                  }
                >
                  <span onClick={() => this.changeLangueg(LANGUEGA.EN)}>
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner && (
          <div className="home-header-banner">
            <div className="banner-content">
              <div className="banner-search">
                <div className="title">
                  <div>
                    <FormattedMessage id="banner.medical-background" />
                  </div>
                  <div>
                    <b>
                      {" "}
                      <FormattedMessage id="banner.care" />
                    </b>
                  </div>
                </div>
                <div className="search">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Tìm kiếm..." />
                </div>
              </div>
              <div className="banner-options">
                <div className="options">
                  <div className="options-content">
                    <div className="opt-icon">
                      <i className="far fa-hospital"></i>
                    </div>
                    <div className="opt-title">
                      <FormattedMessage id={"banner.specialist"} />
                    </div>
                  </div>
                  <div className="options-content">
                    <div className="opt-icon">
                      {" "}
                      <i className="fas fa-mobile-alt"></i>
                    </div>
                    <div className="opt-title">
                      <FormattedMessage id="banner.remote" />
                    </div>
                  </div>
                  <div className="options-content">
                    <div className="opt-icon">
                      <i className="fas fa-notes-medical"></i>
                    </div>
                    <div className="opt-title">
                      <FormattedMessage id="banner.general" />
                    </div>
                  </div>
                  <div className="options-content">
                    <div className="opt-icon">
                      <i className="fas fa-procedures"></i>
                    </div>
                    <div className="opt-title">
                      <FormattedMessage id="banner.test" />
                    </div>
                  </div>
                  <div className="options-content">
                    <div className="opt-icon">
                      <i className="fab fa-creative-commons-sampling-plus"></i>
                    </div>
                    <div className="opt-title">
                      <FormattedMessage id="banner.pure-health" />
                    </div>
                  </div>
                  <div className="options-content">
                    <div className="opt-icon">
                      <i className="fas fa-hospital-alt"></i>
                    </div>
                    <div className="opt-title">
                      <FormattedMessage id="banner.dental" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
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
    changeLanguageRedux: (language) => dispatch(changeLanguegaApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
