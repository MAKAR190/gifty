import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const user = createReducer(
  {},
  {
    [actions.registerSuccess]: (_, { payload }) => payload,
    [actions.loginSuccess]: (_, { payload }) => payload,
    [actions.getMeSuccess]: (_, { payload }) => payload,
    [actions.getByIdSuccess]: (_, { payload }) => payload,
    [actions.logoutSuccess]: () => ({}),
    [actions.updateCartSuccess]: (state, { payload }) => ({
      ...state,
      cart: payload,
    }),
    [actions.updateHistorySuccess]: (state, { payload }) => ({
      ...state,
      history: [...payload],
    }),
    [actions.subscribeEmailSuccess]: (_, { payload }) => payload,
    [actions.updateEmailDetailsSuccess]: (state, { payload }) => ({
      ...state,
      bindedEmail: payload,
    }),
  }
);
const access_token = createReducer(null, {
  [actions.registerSuccess]: (_, { payload }) => payload.access_token,
  [actions.loginSuccess]: (_, { payload }) => payload.access_token,
  [actions.getByIdSuccess]: (_, { payload }) => payload.access_token,
  [actions.logoutSuccess]: () => null,
});
const loading = createReducer(false, {
  [actions.registerRequest]: () => true,
  [actions.registerSuccess]: () => false,
  [actions.registerError]: () => false,
  [actions.loginRequest]: () => true,
  [actions.loginSuccess]: () => false,
  [actions.loginError]: () => false,
  [actions.logoutRequest]: () => true,
  [actions.logoutSuccess]: () => false,
  [actions.logoutError]: () => false,
  [actions.getMeRequest]: () => true,
  [actions.getMeSuccess]: () => false,
  [actions.getMeError]: () => false,
  [actions.getByIdRequest]: () => true,
  [actions.getByIdSuccess]: () => false,
  [actions.getByIdError]: () => false,
  [actions.resetPasswordRequest]: () => true,
  [actions.resetPasswordSuccess]: () => false,
  [actions.resetPasswordError]: () => false,
  [actions.forgotPasswordRequest]: () => true,
  [actions.forgotPasswordSuccess]: () => false,
  [actions.forgotPasswordError]: () => false,
  [actions.updateHistoryRequest]: () => true,
  [actions.updateHistorySuccess]: () => false,
  [actions.updateHistoryError]: () => false,
  [actions.updateEmailDetailsRequest]: () => true,
  [actions.updateEmailDetailsSuccess]: () => false,
  [actions.updateEmailDetailsError]: () => false,
  [actions.subscribeEmailRequest]: () => true,
  [actions.subscribeEmailSuccess]: () => false,
  [actions.subscribeEmailError]: () => false,
});
export default combineReducers({ user, access_token, loading });
