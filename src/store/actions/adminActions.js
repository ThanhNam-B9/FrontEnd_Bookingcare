import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  _getAllCodes,
  _getAllUsers,
  _postCreateNewUser,
  _deleteUser,
  _putEditUser,
  _getTopDoctorHome,
} from "../../services/userService";

//GET Gender
export const fetchGenderSrart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await _getAllCodes("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      }
    } catch (e) {
      dispatch(fetchGenderFaied());
      console.log("fetchGenderSrart", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFaied = () => ({
  type: actionTypes.FETCH_GENDER_FAIDLED,
});

//GET POSITION
export const fetchPositionSrart = () => {
  return async (dispatch, getState) => {
    try {
      //dispatch({ type: actionTypes.FETCH_POSITION_START }); dùng để thêm biesn isLoanding... chờ dữ liệu
      let res = await _getAllCodes("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      }
    } catch (e) {
      dispatch(fetchPositionFaied());
      console.log("fetchPositionSrart", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFaied = () => ({
  type: actionTypes.FETCH_POSITION_FAIDLED,
});
//GET ROLE
export const fecthRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await _getAllCodes("role");
      if (res && res.errCode === 0) {
        dispatch(fecthRoleSuccess(res.data));
      } else {
        dispatch(fecthRoleFeided());
      }
    } catch (e) {
      dispatch(fecthRoleFeided());
      console.log("fetchRoleSrart", e);
    }
  };
};
export const fecthRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fecthRoleFeided = () => ({
  type: actionTypes.FETCH_ROLE_FAIDLED,
});
// creater new user
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await _postCreateNewUser(data);
      if (res && res.errCode === 0) {
        toast.success("Create new user succeed !");
        dispatch(saveUserSuccess());
        dispatch(fecthAllUserStart());
      } else {
        dispatch(saveUserFailed());
        toast.error("Create new user error !");
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("saveUserFailed", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAIDLED,
});
//GET ALL USER
export const fecthAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await _getAllUsers("All");
      let res1 = await _getTopDoctorHome(2);
      console.log("nam doctor", res1);
      if (res && res.errCode === 0) {
        dispatch(fecthAllUserSucess(res.users.reverse()));
      } else {
        dispatch(fecthAllUserFaidled());
      }
    } catch (e) {
      dispatch(fecthAllUserFaidled());
      console.log("fecthAllUserFaidled error:", e);
    }
  };
};
export const fecthAllUserSucess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fecthAllUserFaidled = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIDLED,
});
//DELETE USER
export const fecthDeleteUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await _deleteUser(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete user succeed !");
        dispatch(fecthDeleteUserSucess(res));
        dispatch(fecthAllUserStart());
      } else {
        dispatch(fecthDeleteUserFaidled());
        toast.error("Delete user error !");
      }
    } catch (e) {
      dispatch(fecthDeleteUserFaidled());
      console.log("fecthDeleteUserFaidled error:", e);
    }
  };
};
export const fecthDeleteUserSucess = () => ({
  type: actionTypes.FETCH_DELETE_USER_SUCCESS,
});
export const fecthDeleteUserFaidled = () => ({
  type: actionTypes.FETCH_DELETE_USER_FAIDLED,
});
//EDIT USER
export const fecthEditeUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await _putEditUser(data);
      if (res && res.errCode === 0) {
        toast.success("Edite user succeed !");
        dispatch(fecthDeleteUserSucess(res));
        dispatch(fecthAllUserStart());
      } else {
        dispatch(fecthDeleteUserFaidled());
        toast.error("Edite user error !");
      }
    } catch (e) {
      dispatch(fecthDeleteUserFaidled());
      console.log("fecthEditeUserFaidled error:", e);
    }
  };
};
export const fecthEditUserSucess = () => ({
  type: actionTypes.FETCH_DELETE_USER_SUCCESS,
});
export const fecthEditUserFaidled = () => ({
  type: actionTypes.FETCH_DELETE_USER_FAIDLED,
});
