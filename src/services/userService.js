import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", {
    email: userEmail,
    password: userPassword,
  });
};

const _getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const _postCreateNewUser = (data) => {
  return axios.post(
    "/api/create-new-user",

    data
  );
};
const _deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const _putEditUser = (data) => {
  return axios.put("/api/edit-user", data);
};
const _getAllCodes = (typeInput) => {
  return axios.get(`/api/allcodes?type=${typeInput}`);
};
const _getTopDoctorHome = (limitInput) => {
  return axios.get(`/api/top-doctor-home?limit=${limitInput}`);
};
export {
  handleLoginApi,
  _getAllUsers,
  _postCreateNewUser,
  _deleteUser,
  _putEditUser,
  _getAllCodes,
  _getTopDoctorHome,
};
