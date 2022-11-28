import axios from "axios";
const axiosInstance = axios.create({
  baseUrl: "https://ipredict.onrender.com/api/",
});

export default axiosInstance;
