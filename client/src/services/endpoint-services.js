import axios from "axios";
import environment from "../assets/environment.json";
import { EndpointConstants } from "./constants";

const getBaseURL = () => {
  return environment.baseUrl;
};

/* STARTING USER REST DEFINATIONS */
export const signin = async (data) => {
  const endpoint = getBaseURL() + EndpointConstants.USER.SIGN_IN;
  const res = await axios.post(endpoint, data);
  return res;
};
export const signup = async (data) => {
  const endpoint = getBaseURL() + EndpointConstants.USER.SIGN_UP;
  const res = await axios.post(endpoint, data);
  return res;
};
/* ENDING USER REST DEFINATIONS */

/* STARTING ADMIN REST DEFINATIONS */
export const createProduct = async (data) => {
  const endpoint = getBaseURL() + EndpointConstants.ADMIN.CREATE_PRODUCT;
  const res = await axios.post(endpoint, data);
  return res;
};
/* ENDING ADMIN REST DEFINATIONS */
