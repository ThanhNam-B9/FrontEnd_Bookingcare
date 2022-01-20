import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  isLoadGender: false,
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // get gender
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.isLoadGender = false;
      state.genders = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIDLED:
      state.isLoadGender = false;
      state.genders = [];

      return {
        ...state,
      };
    //get position
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIDLED:
      state.positions = [];

      return {
        ...state,
      };
    //get role
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIDLED:
      state.roles = [];

      return {
        ...state,
      };
    //get all user
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAIDLED:
      state.users = [];

      return {
        ...state,
      };
    //get topDoctor
    case actionTypes.FETCH_GET_DOCTOR_SUCCESS:
      state.topDoctors = action.data;
      console.log("doctorReducer", state.topDoctors);
      return {
        ...state,
      };
    case actionTypes.FETCH_GET_DOCTOR_FAIDLED:
      state.topDoctor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
