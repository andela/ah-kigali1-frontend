import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const token = localStorage.getItem("token");
export default axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});
