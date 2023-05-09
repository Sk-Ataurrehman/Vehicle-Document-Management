import { createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";

const initialState = {
  isLogin: false,
  id: "",
  fullName: "",
  email: "",
  phoneno: "",
  aadharno: "",
  rc: "",
  pucc: "",
  insurance: "",
};

export const signUpUser = (body) => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let response = await res.json();
    console.log(response);
    if (!res.ok) {
      swal("Something Went Wrong!", response.msg, "error");
      console.log("Failed");
    } else {
      console.log(response);
    }
  };
};

export const signInUser = (body) => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let response = await res.json();

    if (!res.ok) {
      console.log("Failed");
      swal("Login Failed", response.msg, "error");
    } else {
      dispatch(authSlice.actions.login({ userData: response.data }));
    }
  };
};

export const updateUser = (body) => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:5000/auth/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let response = await res.json();

    if (!res.ok) {
      console.log("Failed");
    } else {
      console.log(res);
      dispatch(authSlice.actions.login({ userData: response.data }));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(authSlice.actions.logout());
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("login", "true");
      }
      state.id = action.payload.userData._id;
      state.fullName = action.payload.userData.fullName;
      state.email = action.payload.userData.email;
      state.phoneno = action.payload.userData.phoneno;
      state.aadharno = action.payload.userData.aadharno;

      state.rc = action.payload.userData.rc;
      state.pucc = action.payload.userData.pucc;
      state.insurance = action.payload.userData.insurance;
    },
    logout(state, action) {
      state.isLogin = false;
      localStorage.clear();
      state.id = "";
      state.fullName = "";
      state.email = "";
      state.phoneno = "";
      state.aadharno = "";
      state.rc = "";
      state.pucc = "";
      state.insurance = "";
    },
  },
});
