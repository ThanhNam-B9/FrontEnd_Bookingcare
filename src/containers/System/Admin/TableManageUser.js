import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersArr: [],
    };
  }
  componentDidMount() {
    this.props.getAllUser();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userRedux !== this.props.userRedux) {
      this.setState({
        usersArr: this.props.userRedux,
      });
    }
  }
  handleDeteleUser = (data) => {
    this.props.deleteUser(data.id);
  };
  handleEditUserProp = async (data) => {
    await this.props.handleEditUser(data);
  };
  render() {
    let { usersArr } = this.state;
    return (
      <React.Fragment>
        <table id="customers" className="mb-2">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            {usersArr &&
              usersArr.length > 0 &&
              usersArr.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <i
                        className="fas fa-pencil-alt edit"
                        onClick={() => this.handleEditUserProp(item)}
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

        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userRedux: state.admin.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => dispatch(actions.fecthAllUserStart()),
    deleteUser: (userId) => dispatch(actions.fecthDeleteUserStart(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
