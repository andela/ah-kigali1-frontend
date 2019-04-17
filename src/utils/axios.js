import axios from "axios";

const DEV_BASE_USER = process.env.API_URL;
const PROD_BASE_USER = "https://titan-devs-staging.herokuapp.com/api/v1";
export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? PROD_BASE_USER : DEV_BASE_USER
});
