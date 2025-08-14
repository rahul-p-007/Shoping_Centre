import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5000/api" : "/api", // replace with your backend URL when hosting
  withCredentials: true,
});

export default axiosInstance;
