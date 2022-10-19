import { createAction } from "@reduxjs/toolkit";

const registerRequest = createAction("auth/registerRequest");
const registerSuccess = createAction("auth/registerSuccess");
const registerError = createAction("auth/registerError");

const loginRequest = createAction("auth/loginRequest");
const loginSuccess = createAction("auth/loginSuccess");
const loginError = createAction("auth/loginError");

const logoutRequest = createAction("auth/logoutRequest");
const logoutSuccess = createAction("auth/logoutSuccess");
const logoutError = createAction("auth/logoutError");

const getMeRequest = createAction("auth/getCurrentUserRequest");
const getMeSuccess = createAction("auth/getCurrentUserSuccess");
const getMeError = createAction("auth/getCurrentUserError");

const forgotPasswordRequest = createAction("auth/forgotPasswordRequest");
const forgotPasswordSuccess = createAction("auth/forgotPasswordSuccess");
const forgotPasswordError = createAction("auth/forgotPasswordError");

const resetPasswordRequest = createAction("auth/resetPasswordRequest");
const resetPasswordSuccess = createAction("auth/resetPasswordSuccess");
const resetPasswordError = createAction("auth/resetPasswordError");

const getByIdRequest = createAction("auth/getByIdRequest");
const getByIdSuccess = createAction("auth/getByIdSuccess");
const getByIdError = createAction("auth/getByIdError");

const updateCartRequest = createAction("auth/updateCartRequest");
const updateCartSuccess = createAction("auth/updateCartSuccess");
const updateCartError = createAction("auth/updateCartError");

const updateHistoryRequest = createAction("auth/updateHistoryRequest");
const updateHistorySuccess = createAction("auth/updateHistorySuccess");
const updateHistoryError = createAction("auth/updateHistoryError");

const updateEmailDetailsRequest = createAction(
  "auth/updateEmailDetailsRequest"
);
const updateEmailDetailsSuccess = createAction(
  "auth/updateEmailDetailsSuccess"
);
const updateEmailDetaisError = createAction("auth/updateEmailDetailsError");

const subscribeEmailRequest = createAction("auth/subscribeEmailRequest");
const subscribeEmailSuccess = createAction("auth/subscribeEmailSuccess");
const subscribeEmailError = createAction("auth/subscribeEmailError");

const exports = {
  registerRequest,
  registerSuccess,
  registerError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginRequest,
  loginSuccess,
  loginError,
  getMeRequest,
  getMeSuccess,
  getMeError,
  getByIdRequest,
  getByIdSuccess,
  getByIdError,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordError,
  updateCartRequest,
  updateCartSuccess,
  updateCartError,
  updateHistoryRequest,
  updateHistorySuccess,
  updateHistoryError,
  updateEmailDetailsRequest,
  updateEmailDetailsSuccess,
  updateEmailDetaisError,
  subscribeEmailRequest,
  subscribeEmailSuccess,
  subscribeEmailError,
};
export default exports;
