import axios from "axios";
import actions from "./actions";
import selectors from "./selectors";
import { toast } from "react-toastify";
import options from "../../utils/toastOptions";

axios.defaults.baseURL = "https://spl-be.onrender.com";

const token = {
  set(value) {
    axios.defaults.headers.common.Authorization = `Bearer ${value}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = null;
  },
};
const getMe = () => (dispatch, getState) => {
  const stateToken = selectors.getToken(getState());
  if (!stateToken) {
    return;
  }
  token.set(stateToken);
  dispatch(actions.getMeRequest());
  axios
    .get("auth/me")
    .then((response) => {
      dispatch(actions.getMeSuccess(response.data));
    })
    .catch((error) => {
      dispatch(actions.getMeError(error));
    });
};

const register = (credentials) => (dispatch) => {
  dispatch(actions.registerRequest());

  axios
    .post("auth/register", credentials)
    .then((response) => {
      if (response.data.message) {
        toast.error(response.data.message);
        dispatch(actions.registerError(response.data));
      }
      localStorage.setItem("access_token", response.data.access_token);
      token.set(response.data.access_token);
      toast.success("Registered successfully!");
      dispatch(actions.registerSuccess(response.data));
    })
    .catch((error) => dispatch(actions.registerError(error)));
};

const logIn = (credentials) => (dispatch) => {
  dispatch(actions.loginRequest());
  axios
    .post("auth/login", credentials)
    .then((response) => {
      if (response.data.message) {
        toast.error(response.data.message);
        dispatch(actions.loginError(response.data));
        return;
      }
      localStorage.setItem("token", response.data.access_token);
      token.set(response.data.access_token);
      toast.success("Log in was successfull!");
      dispatch(actions.loginSuccess(response.data));
    })
    .catch((error) => {
      dispatch(actions.loginError(error));
    });
};
const logOut = () => (dispatch) => {
  dispatch(actions.logoutRequest());
  token.unset();
  dispatch(actions.logoutSuccess());
  toast.success("Logout was successfull", options);
};
const getUserByEmail = (credentials, access_token) => (dispatch) => {
  dispatch(actions.getByIdRequest());
  axios
    .post("users/email", credentials)
    .then((response) => {
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      localStorage.setItem("token", access_token);
      token.set(access_token);
      toast.success("Authorization with google was successfull!", options);
      dispatch(
        actions.getByIdSuccess({ ...response.data, access_token: access_token })
      );
    })
    .catch((error) => {
      dispatch(actions.getByIdError(error));
    })
    .finally(() => {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }, 3000);
    });
};
const updateUserCart = (id, credentials) => (dispatch) => {
  dispatch(actions.updateCartRequest());
  axios
    .patch(`users/cart/${id}`, credentials)
    .then((response) => {
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      dispatch(actions.updateCartSuccess(response.data));
    })
    .catch((error) => {
      dispatch(actions.updateCartError(error));
    });
};
const updateUserHistory = (id, credentials) => (dispatch) => {
  dispatch(actions.updateHistoryRequest());
  axios
    .patch(`users/history/${id}`, credentials)
    .then((response) => {
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      dispatch(actions.updateHistorySuccess(response.data));
    })
    .catch((error) => {
      dispatch(actions.updateHistoryError(error));
    });
};
const updateEmailDetails = (id, credentials) => (dispatch) => {
  dispatch(actions.updateEmailDetailsRequest());
  axios
    .put(`emails/${id}`, credentials)
    .then((response) => {
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      toast.success("Email communication updated successfully!", options);
      dispatch(actions.updateEmailDetailsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(actions.updateEmailDetaisError(error));
    });
};
const subscribeOnEmail = (id, credentials, type) => (dispatch) => {
  dispatch(actions.subscribeEmailRequest());
  axios
    .patch(`users/subscribe/${id}`, credentials)
    .then((response) => {
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      if (type === "subscribe") {
        toast.success(
          "You have just subscribed on our email communication! We will inform you about solar power life news and other useful information",
          options
        );
      } else if (type === "unsubscribe") {
        toast.info(
          "You have just unsubscribed from our email communication",
          options
        );
      }

      dispatch(actions.subscribeEmailSuccess(response.data));
    })
    .catch((error) => {
      dispatch(actions.subscribeEmailError(error));
    });
};
const forgotPassword = (credentials) => (dispatch) => {
  dispatch(actions.forgotPasswordRequest());
  axios
    .post("auth/users/forgotPassword", credentials)
    .then((response) => {
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      toast.success(
        "We sent you a link to reset your password on your email",
        options
      );
      dispatch(actions.forgotPasswordSuccess(response.data));
    })
    .catch((error) => {
      dispatch(actions.forgotPasswordError(error));
    });
};
const resetPassword = (credentials) => (dispatch) => {
  dispatch(actions.resetPasswordRequest());
  axios
    .post(`auth/users/resetPassword/${credentials.token}`, credentials)
    .then((response) => {
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      toast.success(
        "Password resetted successfully! Now you can log in with it"
      );
      dispatch(actions.resetPasswordSuccess(response.data));
    })
    .catch((error) => {
      dispatch(actions.resetPasswordError(error));
    });
};
const exports = {
  getMe,
  register,
  logIn,
  logOut,
  getUserByEmail,
  forgotPassword,
  resetPassword,
  updateUserCart,
  updateUserHistory,
  updateEmailDetails,
  subscribeOnEmail,
};
export default exports;
