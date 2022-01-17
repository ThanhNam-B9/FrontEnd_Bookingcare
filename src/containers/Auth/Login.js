import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./Login.scss";
import * as actions from "../../store/actions";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isHidePassword: true,
      errMessage: "",
    };
  }
  handleOnChangeInput = (event) => {
    // this.setState({
    //   username: event.target.value,
    // });
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
    this.setState({
      errMessage: "",
    });
  };
  handleShowHidePassword = () => {
    this.setState({ isHidePassword: !this.state.isHidePassword });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    //console.log("name:", this.state.username, "pass:", this.state.password);
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data) {
        if (data.errCode !== 0) {
          this.setState({ errMessage: data.message });
        }
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login succeed!");
      }
    } catch (error) {
      // console.log(error.response.data.message);
      if (error.response) {
        if (error.response.data) {
          this.setState({ errMessage: error.response.data.message });
        }
      }
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text">Login</div>
            <div className="form-group login-input col-12">
              <label>Username</label>
              <input
                type="email"
                name="username"
                className="form-control"
                value={this.state.username}
                onChange={(event) => {
                  this.handleOnChangeInput(event);
                }}
                placeholder="Enter you username"
              />
            </div>
            <div className="form-group login-input col-12">
              <label>Password</label>
              <div className="hiden-password">
                <input
                  type={this.state.isHidePassword ? "password" : "text"}
                  className="form-control"
                  value={this.state.password}
                  name="password"
                  onChange={(event) => {
                    this.handleOnChangeInput(event);
                  }}
                  placeholder="Enter you password"
                />
                <i
                  className={
                    this.state.isHidePassword
                      ? "far fa-eye-slash"
                      : "far fa-eye"
                  }
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                ></i>
              </div>
            </div>
            <div className="col-12" style={{ color: "red", fontSize: "12px" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 login-btn">
              <button onClick={() => this.handleLogin()}>Login</button>
            </div>
            <div className="login-forget">
              <span>Forgot your password?</span>
            </div>
            <div className="col-12">
              <div className="text-center mt-3">Or Sign in With</div>
            </div>
            <div className="col-12 login-social">
              <i className="fab fa-facebook-f facebook"></i>
              <i className="fab fa-google-plus-g google"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
