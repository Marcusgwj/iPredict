import axios from "axios";
const axiosInstance = axios.create({
  baseUrl: "http://localhost:8800/api/",
});

export default axiosInstance;

// Production: "https://ipredict.herokuapp.com/api/"
// Or "https://ipredict.herokuapp.com/api/auth/"
