import axios from "axios";

const api = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// List of all endpoints
export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);

export default api;
