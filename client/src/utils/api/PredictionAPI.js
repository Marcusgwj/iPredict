import axios from "axios";

const basePath = "https://stock-predictionapi.onrender.com";

export const fetchLR = async (stock) => {
  try {
    const response = await axios.post(`${basePath}/lr`, { ticker: stock });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchLSTM = async (stock) => {
  try {
    const response = await axios.post(`${basePath}/lstm`, { ticker: stock });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchSVR = async (stock) => {
  try {
    const response = await axios.post(`${basePath}/svr`, { ticker: stock });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
