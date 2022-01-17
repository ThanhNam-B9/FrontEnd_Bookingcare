import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUEGA } from "../../utils";
import { FormattedMessage } from "react-intl";

class Header extends Component {
  handlechaneLanguage = (language) => {
    // console.log("lang:", language);
    this.props.changeLanguageRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        <div className="header-languages">
          <div className="welcome">
            <FormattedMessage id="home-headers.welcome" />
            {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
          </div>

          <div
            className={
              language === LANGUEGA.VI ? "language-vi action" : "language-vi"
            }
            onClick={() => this.handlechaneLanguage(LANGUEGA.VI)}
          >
            VN
          </div>
          <div
            className={
              language === LANGUEGA.EN ? "language-en action" : "language-en"
            }
            onClick={() => this.handlechaneLanguage(LANGUEGA.EN)}
          >
            EN
          </div>

          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageRedux: (language) =>
      dispatch(actions.changeLanguegaApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
