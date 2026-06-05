import axios from "axios";

const API = axios.create({
  baseURL:
    "https://brandmentionsandprmonitor-backend.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});

/*
|--------------------------------------------------------------------------
| JWT Interceptor
|--------------------------------------------------------------------------
*/

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

export const signupUser =
  async (userData) => {
    const response =
      await API.post(
        "/auth/signup",
        userData
      );

    return response.data;
  };

export const loginUser =
  async (userData) => {
    const response =
      await API.post(
        "/auth/login",
        userData
      );

    return response.data;
  };

export const getCurrentUser =
  async () => {
    const response =
      await API.get("/auth/me");

    return response.data;
  };

export const logoutUser =
  async () => {
    const response =
      await API.post(
        "/auth/logout"
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| Google Login
|--------------------------------------------------------------------------
*/

export const googleLoginUrl =
  "https://brandmentionsandprmonitor-backend.onrender.com/api/auth/google";

/*
|--------------------------------------------------------------------------
| Mentions
|--------------------------------------------------------------------------
*/

export const searchMentions =
  async (keyword) => {
    const response =
      await API.get(
        `/mentions/${keyword}`
      );

    return response.data;
  };

export const getAllMentions =
  async () => {
    const response =
      await API.get(
        "/mentions"
      );

    return response.data;
  };

export const getMentionById =
  async (id) => {
    const response =
      await API.get(
        `/mentions/details/${id}`
      );

    return response.data;
  };

export const getHighRiskMentions =
  async () => {
    const response =
      await API.get(
        "/mentions/risk/high"
      );

    return response.data;
  };

export const deleteMention =
  async (id) => {
    const response =
      await API.delete(
        `/mentions/${id}`
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| Reports
|--------------------------------------------------------------------------
*/

export const generateReport =
  async (keyword) => {
    const response =
      await API.post(
        `/reports/generate/${keyword}`
      );

    return response.data;
  };

export const getReports =
  async () => {
    const response =
      await API.get(
        "/reports"
      );

    return response.data;
  };

export const getReportById =
  async (id) => {
    const response =
      await API.get(
        `/reports/${id}`
      );

    return response.data;
  };

export const deleteReport =
  async (id) => {
    const response =
      await API.delete(
        `/reports/${id}`
      );

    return response.data;
  };

export const getAnalytics =
  async () => {
    const response =
      await API.get(
        "/reports/analytics/overview"
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

export const getUsers =
  async () => {
    const response =
      await API.get(
        "/admin/users"
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
*/

export const getSettings =
  async () => {
    const response =
      await API.get(
        "/settings"
      );

    return response.data;
  };

export const saveSettings =
  async (settings) => {
    const response =
      await API.put(
        "/settings",
        settings
      );

    return response.data;
  };

export const deleteAccount =
  async () => {
    const response =
      await API.delete(
        "/settings/account"
      );

    return response.data;
  };

export default API;