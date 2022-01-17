import React, { Component } from "react";

// Import css files

import { connect } from "react-redux";
class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy;2022 Thanh Nam IT. More information , please visit my your
          facebook.
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/thanhnam.b9"
          >
            &#8594; Click here &#8592;
          </a>
        </p>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
