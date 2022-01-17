import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let { currUser } = this.props;
    if (currUser && !_.isEmpty(currUser)) {
      this.setState({
        id: currUser.id,
        email: currUser.email,
        password: "abc",
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        address: currUser.address,
      });
    }
  }
  handleOnChaneInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter " + arrInput[i] + "!");
        break;
      }
    }
    return isValid;
  };
  handleEditUserModal = (data) => {
    let isValidInput = this.checkValideInput();
    if (isValidInput === true) {
      this.props.handleEditUser(this.state);
    }
  };

  async componentDidUpdate() {}

  toggle = () => {
    this.props.toggleEditUser();
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <Modal
            isOpen={this.props.isOpenModal}
            toggle={this.toggle}
            // className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>

            <ModalBody>
              <form>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={(event) => this.handleOnChaneInput(event)}
                      name="email"
                      placeholder="Email"
                      disabled
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(event) => this.handleOnChaneInput(event)}
                      name="password"
                      placeholder="Password"
                      disabled
                      value={this.state.password}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="form-group col-md-6">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={(event) => this.handleOnChaneInput(event)}
                      name="firstName"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={(event) => this.handleOnChaneInput(event)}
                      name="lastName"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="inputAddress">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) => this.handleOnChaneInput(event)}
                    name="address"
                    placeholder="1234 Main St"
                  />
                </div>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                className="px-2"
                onClick={() => {
                  this.handleEditUserModal();
                }}
              >
                Save Changes
              </Button>
              <Button color="danger" className="px-2" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ModalEditUser;
