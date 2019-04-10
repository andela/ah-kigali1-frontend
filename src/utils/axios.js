import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const token = localStorage.getItem("token");
const DEV_BASE_USER = process.env.API_URL;
export default axios.create({
  baseURL: DEV_BASE_USER,
  headers: {
    Authorization: `Bearer ${token}`
  }
});
