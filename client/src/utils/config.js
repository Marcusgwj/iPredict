import axios from "axios";
const axiosInstance = axios.create({
  baseUrl: "https://ipredict.herokuapp.com/api/",
});

export default axiosInstance;
