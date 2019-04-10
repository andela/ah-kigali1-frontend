import axios from "axios";

const DEV_BASE_USER = "http://localhost:3000/api/v1";
const PROD_BASE_USER = "https://titan-devs-staging.herokuapp.com/api/v1";
export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? PROD_BASE_USER : DEV_BASE_USER
});
