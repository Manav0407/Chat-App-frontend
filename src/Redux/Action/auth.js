import axios from "axios";
import {
  clearError,
  clearMessage,
  signupFailure,
  signupRequest,
  signupSuccess,
  signinFailure,
  signinRequest,
  signinSuccess,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  emailVarificationRequest,
  emailVarificationSuccess,
  emailVarificationFailure,
  loginWithGoogle,
} from "../Reducer/authSlice";

export const signup = (formData) => async (dispatch) => {
  try {
    // console.log(avatar);
    dispatch(signupRequest());

    const { data } = await axios.post(
      "https://chat-app-with-tracking-location.onrender.com/user/signup",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        credentials: "include",
      }
    );
    // console.log(data);
    await dispatch(signupSuccess(data.message));
    dispatch(clearMessage());
  } catch (error) {
    console.log(error);
    await dispatch(signupFailure(error?.response.data.message));
    dispatch(clearError());
  }
};

export const signin = (email, password) => async (dispatch) => {
  try {
    dispatch(signinRequest());

    const { data } = await axios.post(
      "https://chat-app-with-tracking-location.onrender.com/user/signin",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    await dispatch(signinSuccess(data.user));
    dispatch(clearMessage());
  } catch (error) {
    await dispatch(signinFailure(error?.response.data.message));
    dispatch(clearError());
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get("https://chat-app-with-tracking-location.onrender.com/user/me", {
      withCredentials: true,
    });

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFailure(error?.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    await axios.get("https://chat-app-with-tracking-location.onrender.com/user/logout", {
      withCredentials: true,
    });
    dispatch(logoutSuccess(null));
  } catch (error) {
    dispatch(logoutFailure(error?.response.data.message));
  }
};

export const emailVarification = (id, token) => async (dispatch) => {
  try {
    console.log("id", id);
    console.log("token", token);
    dispatch(emailVarificationRequest());
    const { data } = await axios.get(
      `https://chat-app-with-tracking-location.onrender.com/user/${id}/verify/${token}`
    );
    await dispatch(emailVarificationSuccess(data.message));
    dispatch(clearMessage());
  } catch (error) {
    await dispatch(emailVarificationFailure(error?.response.data.message));
    dispatch(clearError());
  }
};

// export const googleLogin = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get(
//       "htttp://localhost:4000/user/google/login/suceess"
//     );
//       console.log(data);

//       dispatch(loginWithGoogle(data.user));
//   } catch (error) {
//     console.log(error);
//   }
// };
