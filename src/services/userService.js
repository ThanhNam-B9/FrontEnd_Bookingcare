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
const _getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};
const _postSaveDetailDoctor = (data) => {
  return axios.post(`/api/save-info-doctors`, data);
};
const _getDetailDoctorById = (doctorId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`);
};
const _postBulkCreateSchedule = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const _getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?date=${date}&doctorId=${doctorId}`
  );
};
const _getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const _getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
export {
  handleLoginApi,
  _getAllUsers,
  _postCreateNewUser,
  _deleteUser,
  _putEditUser,
  _getAllCodes,
  _getTopDoctorHome,
  _getAllDoctors,
  _postSaveDetailDoctor,
  _getDetailDoctorById,
  _postBulkCreateSchedule,
  _getScheduleDoctorByDate,
  _getExtraInforDoctorById,
  _getProfileDoctorById,
};
