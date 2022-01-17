import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import { emitter } from "../../utils/emitter";
import {
  _getAllUsers,
  _postCreateNewUser,
  _deleteUser,
  _putEditUser,
} from "../../services/userService";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalAdd: false,
      isOpenModalEdit: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    let repsonse = await _getAllUsers("All");
    if (repsonse && repsonse.errCode === 0) {
      this.setState({
        arrUsers: repsonse.users,
      });
      console.log("arrUsers:", this.arrUsers);
    }
  };
  handleAddUserModal = () => {
    this.setState({
      isOpenModalAdd: true,
    });
  };

  toggleAddUser = () => {
    this.setState({
      isOpenModalAdd: !this.state.isOpenModalAdd,
    });
  };
  handleCreateNewUser = async (data) => {
    console.log("dataUser: ", data);
    try {
      let response = await _postCreateNewUser(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalAdd: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeteleUser = async (data) => {
    try {
      let response = await _deleteUser(data.id);
      if (response && response.errCode === 0) {
        await this.getAllUsersFromReact();
        alert("You have successfully deleted the user");
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUserModal = (user) => {
    this.setState({
      isOpenModalEdit: true,
      userEdit: user,
    });
  };
  toggleEditUser = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit,
    });
  };

  handleEditUser = async (data) => {
    try {
      let response = await _putEditUser(data);
      if (response && response.errCode === 0) {
        await this.getAllUsersFromReact();
        alert("You have successfully edited the user");
        this.setState({
          isOpenModalEdit: false,
        });
      } else {
        console.log(response.errMessage);
      }
      console.log("edit no:", response);
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    //console.log(" users render: ", this.state.userEdit);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalAddUser
          isOpenModal={this.state.isOpenModalAdd}
          toggleAddUser={this.toggleAddUser}
          handleCreateNewUser={this.handleCreateNewUser}
        />
        {this.state.isOpenModalEdit && (
          <ModalEditUser
            isOpenModal={this.state.isOpenModalEdit}
            toggleEditUser={this.toggleEditUser}
            currUser={this.state.userEdit}
            handleEditUser={this.handleEditUser}
          />
        )}
        <div className="title text-center">Manage users with NamIT</div>
        <div className="users-table mx-2">
          <div
            className="btn btn-primary px-2 my-2"
            onClick={() => {
              this.handleAddUserModal();
            }}
          >
            <i className="fas fa-plus mx-1 " />
            Add new user
          </div>
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        {/* <button className="btn-edit"></button>
                      <button className="btn-delete"></button> */}
                        <i
                          className="fas fa-pencil-alt edit"
                          onClick={() => this.handleEditUserModal(item)}
                        ></i>

                        <i
                          className="fas fa-trash delete"
                          onClick={() => this.handleDeteleUser(item)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
