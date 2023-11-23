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
export const getCurrentUser = async (accessToken) => {
  const endpoint = getBaseURL() + EndpointConstants.USER.AUTHORIZE;
  const res = await axios.get(endpoint, {
    headers: {
      token: `Bearer ${accessToken}`,
    },
  });
  return res;
};
export const getUserDetail = async (id) => {
  const accessToken = localStorage.getItem("access_token");
  const endpoint = getBaseURL() + `/detail-user/${id}`;
  const res = await axios.get(endpoint, {
    headers: {
      token: `Bearer ${accessToken}`,
    },
  });
  return res;
};
/* ENDING USER REST DEFINATIONS */

/* STARTING ADMIN REST DEFINATIONS */
export const createProduct = async (data) => {
  const endpoint = getBaseURL() + EndpointConstants.ADMIN.CREATE_PRODUCT;
  const res = await axios.post(endpoint, data);
  return res;
};
export const getAllProducts = async (search, limit) => {
  let endpoint;
  if (search?.length > 0) {
    endpoint =
      getBaseURL() +
      `/product?filter=productName&filter=${search}&limit=${limit}`;
  } else {
    endpoint = getBaseURL() + `/product?limit=${limit}`;
  }
  const res = await axios.get(endpoint);
  return res;
};
export const getProductDetails = async (productId) => {
  const endpoint =
    getBaseURL() + EndpointConstants.USER.PRODUCT_DETAILS + `/${productId}`;
  const res = await axios.get(endpoint);
  return res;
};
export const updateProduct = async (data, productId) => {
  const endpoint =
    getBaseURL() + EndpointConstants.ADMIN.UPDATE_PRODUCT + `/${productId}`;
  const res = await axios.put(endpoint, data);
  return res;
};
export const deleteProduct = async (productId) => {
  const endpoint =
    getBaseURL() + EndpointConstants.ADMIN.DELETE_PRODUCT + `/${productId}`;
  const res = await axios.delete(endpoint);
  return res;
};
/* ENDING ADMIN REST DEFINATIONS */

export const handleError = (error) => {
  if (error.response) {
    // status code out of the range of 2xx
    console.log("Data :", error.response.data);
    console.log("Status :" + error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
  } else {
    // Error on setting up the request
    console.log("Error", error.message);
  }
};
