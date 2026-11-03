
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Automatically attach admin JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let Axios/browser set the multipart boundary for FormData.
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Automatically logout when the admin session expires
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const token = localStorage.getItem("adminToken");

    const isLoginRequest = requestUrl.includes("/api/auth/login");

    if (status === 401 && token && !isLoginRequest) {
      // Clear authentication data
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");

      // Inform the login page that the session expired
      sessionStorage.setItem("sessionExpired", "true");

      // Redirect to login and prevent returning to the protected page
      window.location.replace("/admin/login");
    }

    return Promise.reject(error);
  }
);

export default api;
