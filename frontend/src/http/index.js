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
export const logout = () => api.post("/api/logout");
export const createRoom = (data) => api.post("/api/rooms", data);
export const getAllRooms = () => api.get("/api/rooms");
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);

//Interceptor (It automatically send an request to server if any response falied)
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    // It checks if user is unauthorized (token expired)
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true; //To avoid infinte loop

      // This will create an new token from backend
      try {
        await axios.get(`http://localhost:5000/api/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest); //Calling the failed request again
      } catch (error) {
        console.log(error.message);
      }
    }
  }
);

export default api;
