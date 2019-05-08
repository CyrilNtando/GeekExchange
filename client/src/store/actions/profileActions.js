import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};
//Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};
//Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      console.log(JSON.stringify(err.data));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.message
      });
    });
};
//add exprience
export const addExperience = (expData, history) => {
  return function(dispatch) {
    axios
      .post("/api/profile/experience", expData)
      .then(res => history.push("/dashboard"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.message
        })
      );
  };
};
//add eduction
export const addEducation = (eduData, history) => {
  return function(dispatch) {
    axios
      .post("/api/profile/education", eduData)
      .then(res => history.push("/dashboard"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.message
        })
      );
  };
};
//Delete Experience
export const deleteExperience = id => {
  return function(dispatch) {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.message
        })
      );
  };
};
//Delete Education
export const deleteEducation = id => {
  return function(dispatch) {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.message
        })
      );
  };
};
//Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: GET_PROFILES,
        payload: {}
      });
    });
};
//delete account anf profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure this cannot be undone")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(error =>
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data.message
        })
      );
  }
};
//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
