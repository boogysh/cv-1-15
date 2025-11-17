export const SET_PROJECT_DATA = "SET_PROJECT_DATA";
export const SET_USER_IP = "SET_USER_IP";

export const setProjectData = (payload) => ({
  type: SET_PROJECT_DATA,
  payload,
});

export const setUserIp = (ip) => ({
  type: SET_USER_IP,
  payload: ip,
});
