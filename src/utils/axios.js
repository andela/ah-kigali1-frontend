import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default axios.create({
  baseURL: process.env.API_BASE_URL
});
